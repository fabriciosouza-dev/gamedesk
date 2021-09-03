class PopulaTabelaMantisService
  require 'rest-client'
  require 'json'
  require 'zendesk_api'

  def initialize(params) end

  def execute

    auth = JSON.parse(RestClient.post('https://api.siedos.com.br/signup',
                                      email: Rails.application.credentials.aws[:secret_username_mantis],
                                      password: Rails.application.credentials.aws[:secret_password_mantis]).body)["auth_token"]

    url_chamados = 'https://api.siedos.com.br/issues/fabricio?dta_inicio=01/01/2019&dta_fim=02/08/2021'
    url_users = 'https://api.siedos.com.br/issues/fabricio_users'

    response_chamados = RestClient.get(url_chamados, Authorization: auth)
    response_users = RestClient.get(url_users, Authorization: auth)

    obj_chamados = JSON.parse(response_chamados.body)
    obj_users = JSON.parse(response_users.body)

    obj_users.each do |user|
      admin = [9, 294].include? user['id']
      User.where(assignee_id: user["id"])
          .first_or_create(atributos_user(user,
                                          User.default_password,
                                          admin))
      # ConquistasService.new(assignee_id: user.id).execute
    end

    obj_chamados.each do |ticket|
      ticket_object = Ticket.find_by(ticket_id: ticket['id'])
      if ticket_object.present?
        if ticket['status_id'] == Ticket.statuses[:aguardando_desenvolvimento] && ['atribuído', 'resolvido'].include?(ticket_object.status)
          pending = ticket['updated_at']
        elsif ticket_object.status == 'aguardando_desenvolvimento' && [Ticket.statuses[:atribuido], Ticket.statuses[:resolvido]].include?(ticket['status_id'])
          pending = nil
        elsif ticket['status_id'] == Ticket.statuses[:aguardando_desenvolvimento] && ticket_object[:status] == 'aguardando_desenvolvimento'
          pending = ticket_object.pending_at
        else
          pending = nil
        end
        ticket_object.update(atributos_tickets(ticket, pending).except(:ticket_id)) if ticket_object.changed_at.to_s != ticket['updated_at'].to_s
        comments = ticket['comments'].select { |x| !ticket_object.comments.map(&:comment_id).include?(x['id']) }
        new_comments = []
        if comments.present?
          comments.each do |comment|
            new_comments << ticket_object.comments.where(comment_id: comment.id).first_or_create(
              atributos_comments(comment, ticket_object)
            )
          end
        end
        if ticket_object.status == "atribuído" && ticket['status_id'] == Ticket.statuses[:resolvido] && ticket_object.flag_calc_level == 1
          ticket_object.flag_calc_level = 0
        end
        CalculaLevelMantisService.new(new_ticket: ticket_object,
                                      old_ticket: ticket,
                                      new_comments: new_comments,
                                      old_comments: comments).execute
      else
        comments = []
        new_comments = []
        pending = ticket['status_id'] == Ticket.statuses[:aguardando_desenvolvimento] ? ticket['created_at'] : nil
        ticket_object = Ticket.create(atributos_tickets(ticket, pending))
        ticket['comments'].each do |comment|
          new_comments << Comment.create(atributos_comments(comment, ticket_object))
        end
        CalculaLevelMantisService.new(new_ticket: ticket_object,
                                      old_ticket: ticket,
                                      new_comments: new_comments,
                                      old_comments: comments).execute
      end
    end
  end

  # private methods

  private

  def atributos_comments(comment, ticket_object)
    {
      ticket_id: ticket_object['ticket_id'],
      open_at: comment['created_at'],
      flag_game: 0
    }
  end

  def atributos_user(params, password, type_user)
    {
      assignee_id: params['id'],
      name: params['name'],
      email: params['email'],
      phone: nil,
      admin: type_user ? 1 : 0,
      status: 1,
      password: password,
      password_confirmation: password,
    }
  end

  def atributos_tickets(ticket, pending)
    {
      ticket_id: ticket['id'],
      priority: ticket['priority'],
      status: ticket['status_id'],
      assignee_id: ticket['creator_id'],
      flag_game: 0,
      open_at: ticket['created_at'],
      changed_at: ticket['updated_at'],
      pending_at: pending,
      closed_at: nil
    }
  end
end