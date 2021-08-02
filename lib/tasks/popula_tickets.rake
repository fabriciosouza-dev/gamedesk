namespace :popula_tickets do

  desc "a new task to be executed"
  task :execute do
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

    client.tickets.map { |x| x[:id] }.each do |ticket|
      ZendeskAPI::Ticket.destroy!(client, id: ticket)
    end

    (1..40).each do |n|
      ZendeskAPI::Ticket.create!(client, subject: subjects.shuffle.first,
                                 comment: { value: "This is a test" },
                                 status: status.shuffle.first,
                                 submitter_id: end_user(client).shuffle.first, priority: priority.shuffle.first,
                                 assignee_id: agents(client).shuffle.first
      )
    end

  end

  def agents(client)
    client.users.select { |x| ['admin', 'agent'].include?(x[:role]) }.map { |x| x.id }
  end

  def end_user(client)
    client.users.select { |x| ['end-user'].include?(x[:role]) }.map { |x| x.id }
  end

  def priority
    ['high', 'low', 'normal', 'urgent']
  end

  def status
    ['pending', 'solved', 'open']
  end

  def subjects
    ["Problema no toner",
     "Servidor não está subindo",
     "Filial norte sem conexão",
     "Café acabou",
     "Firefox fora do ar",
     "Formatar o pc gamer do chefe",
     "Celular não esta conectando na rede",
     "Não consigo conectar no wifi",
     "As máquinas estão nos atacando",
     "Hd queimou",
     "Servidor sem energia",
     "Cpd em chamas",
     "Ativar o windows",
     "Configurar e-mail",
     "Configurar o pacote office",
     "Ponto de rede com problema",
     "Internet lenta",
     "Filial sul com problema",
     "Servidor pegando fogo",
     "Windows pirata",
     "Formatar pc",
     "Problema no meu iphone",
     "Não consigo abrir o facebook",
     "Não consigo abrir o instagram",
     "Não consigo abrir o youtube",
     "Não consigo jogar durante o expediente",
     "Hackear facebook",
     "Hackear instagram",
     "Hackear orkut",
     "Hackear youtube",
     "Torrent não abre",
    ]
  end

end
