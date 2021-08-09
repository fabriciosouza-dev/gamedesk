class PopulaTabelaService
  require 'zendesk_api'

  def initialize(params) end

  def execute

    client = ZendeskAPI::Client.new do |config|
      # Mandatory:
      config.url = Rails.application.credentials.aws[:secret_url] # e.g. https://yoursubdomain.zendesk.com/api/v2

      # Basic / Token Authentication
      config.username = Rails.application.credentials.aws[:secret_username]

      # Choose one of the following depending on your authentication choice
      config.token = Rails.application.credentials.aws[:secret_token]
      config.password = Rails.application.credentials.aws[:secret_password]

      # OAuth Authentication
      # config.access_token = "6cdc6878bdf5ef1b4ae610c6bf965787744fe0a525b5e81d1cb453e4421ce330"

      # Optional:

      # Retry uses middleware to notify the user
      # when hitting the rate limit, sleep automatically,
      # then retry the request.
      config.retry = true

      # Raise error when hitting the rate limit.
      # This is ignored and always set to false when `retry` is enabled.
      # Disabled by default.
      config.raise_error_when_rate_limited = false

      # Logger prints to STDERR by default, to e.g. print to stdout:
      require 'logger'
      config.logger = Logger.new(STDOUT)

      # Disable resource cache (this is enabled by default)
      config.use_resource_cache = false

      # Changes Faraday adapter
      # config.adapter = :patron

      # Merged with the default client options hash
      # config.client_options = {:ssl => {:verify => false}, :request => {:timeout => 30}}

      # When getting the error 'hostname does not match the server certificate'
      # use the API at https://yoursubdomain.zendesk.com/api/v2
    end

    client.tickets.each do |ticket|
      ticket_object = Ticket.find_by(ticket_id: ticket[:id])
      if ticket_object.present?
        if ticket[:status] == 'pending' && ['open', 'solved'].include?(ticket_object.status)
          pending = ticket[:updated_at]
        elsif ticket_object.status == 'pending' && ['open', 'solved'].include?(ticket[:status])
          pending = nil
        elsif ticket[:status] == 'pending' && ticket_object[:status] == 'pending'
          pending = ticket_object.pending_at
        else
          pending = nil
        end
        ticket_object.update(atributos_tickets(ticket, pending).except(:ticket_id)) if ticket_object.changed_at.to_s != ticket[:updated_at].to_s
        comments = ticket.comments.select { |x| !ticket_object.comments.map(&:comment_id).include?(x.id) }
        new_comments = []
        if comments.present?
          comments.each do |comment|
            new_comments << ticket_object.comments.where(comment_id: comment.id).first_or_create(
              atributos_comments(comment, ticket_object)
            )
          end
        end
        if ticket_object.status == "open" && ticket[:status] == "closed" && ticket_object.flag_calc_level == 1
          ticket_object.flag_calc_level = 0
        end
        CalculaLevelService.new(new_ticket: ticket_object,
                                old_ticket: ticket,
                                new_comments: new_comments,
                                old_comments: comments).execute
      else
        comments = []
        new_comments = []
        pending = ticket[:status] == 'pending' ? ticket[:created_at] : nil
        ticket_object = Ticket.create(atributos_tickets(ticket, pending))
        ticket.comments.each do |comment|
          new_comments << Comment.create(atributos_comments(comment, ticket_object))
        end
        CalculaLevelService.new(new_ticket: ticket_object,
                                old_ticket: ticket,
                                new_comments: new_comments,
                                old_comments: comments).execute
      end
    end

    client.users.select { |x| ['admin', 'agent'].include?(x[:role]) }.each do |user|
      User.where(email: user[:email])
          .first_or_create(atributos_user(user,
                                          User.default_password,
                                          user[:role]))
      ConquistasService.new(assignee_id: user.id).execute
    end
  end

  # private methods

  private

  def atributos_comments(comment, ticket_object)
    {
      ticket_id: ticket_object[:id],
      comment_id: comment[:id],
      body: comment[:body],
      html_body: comment[:html_body],
      ip_address: comment[:ip_address],
      location: comment[:location],
      public: comment[:public] ? 0 : 1,
      open_at: comment[:created_at],
      flag_game: 0
    }
  end

  def atributos_user(params, password, type_user)
    {
      assignee_id: params[:id],
      name: params[:name],
      email: params[:email],
      phone: params[:phone],
      admin: type_user == "admin" ? 1 : 0,
      status: 1,
      password: password,
      password_confirmation: password,
    }
  end

  def atributos_tickets(ticket, pending)
    {
      ticket_id: ticket[:id],
      subject: ticket[:subject],
      raw_subject: ticket[:raw_subject],
      description: ticket[:description],
      priority: ticket[:priority],
      status: ticket[:status],
      recipient: ticket[:recipient],
      requester_id: ticket[:requester_id],
      submitter_id: ticket[:submitter_id],
      assignee_id: ticket[:assignee_id],
      organization_id: ticket[:organization_id],
      group_id: ticket[:group_id],
      forum_topic_id: ticket[:forum_topic_id],
      problem_id: ticket[:problem_id],
      has_incidents: ticket[:has_incidents] ? 0 : 1,
      is_public: ticket[:is_public] ? 0 : 1,
      allow_channelback: ticket[:allow_channelback] ? 0 : 1,
      allow_attachments: ticket[:allow_attachments] ? 0 : 1,
      satisfaction_rating: ticket[:satisfaction_rating],
      ticket_form_id: ticket[:ticket_form_id],
      brand_id: ticket[:brand_id],
      due_at: ticket[:due_at],
      flag_game: 0,
      open_at: ticket[:created_at],
      changed_at: ticket[:updated_at],
      pending_at: pending,
      closed_at: nil
    }
  end
end