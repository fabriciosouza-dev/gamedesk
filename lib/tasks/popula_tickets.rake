namespace :popula_tickets do
  # rake popula_tickets:execute
  desc "a new task to be executed"
  task execute: :environment do
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

    Yield.destroy_all
    Ticket.destroy_all
    Comment.destroy_all
    UserReward.destroy_all
    UserAchievement.destroy_all

    client.tickets.map { |x| x[:id] }.each do |ticket|
      ZendeskAPI::Ticket.destroy!(client, id: ticket)
    end

    (1..400).each do |n|
      puts n
      ZendeskAPI::Ticket.create!(client, subject: subjects.shuffle.first,
                                 comment: { value: "Conte??do do Chamado" },
                                 status: status,
                                 submitter_id: end_user(client).shuffle.first, priority: priority,
                                 assignee_id: agents(client).shuffle.first
      )
    end

  end

  private

  def agents(client)
    client.users.select { |x| ['admin', 'agent'].include?(x[:role]) }.map { |x| x.id }
  end

  def end_user(client)
    client.users.select { |x| ['end-user'].include?(x[:role]) }.map { |x| x.id }
  end

  def priority
    number = array.shuffle.first
    if [*1..4].include?(number)
      'urgent'
    elsif [*5..7].include?(number)
      'high'
    elsif [*8..9].include?(number)
      'normal'
    else
      'low'
    end
  end

  def status
    number = array.shuffle.first
    if [*1..6].include?(number)
      'solved'
    elsif [*7..9].include?(number)
      'pending'
    elsif [10].include?(number)
      'open'
    end
  end

  def subjects
    ["Problema no toner",
     "Servidor n??o est?? subindo",
     "Filial norte sem conex??o",
     "Caf?? acabou",
     "Firefox fora do ar",
     "Formatar o pc gamer do chefe",
     "Celular n??o esta conectando na rede",
     "N??o consigo conectar no wifi",
     "As m??quinas est??o nos atacando",
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
     "N??o consigo abrir o facebook",
     "N??o consigo abrir o instagram",
     "N??o consigo abrir o youtube",
     "N??o consigo jogar durante o expediente",
     "Hackear facebook",
     "Hackear instagram",
     "Hackear orkut",
     "Hackear youtube",
     "Torrent n??o abre",
     "Minha impressora parou!",
     "Arruma meu computador?",
     "O ar condicionado parou!",
     "Aquele Carinha da TI",
     "T?? muito lento!",
     "??rea de Trabalho?",
     "?? URGENTE!",
     "Apaguei sem querer???",
     "O sistema n??o entra???",
     "Garoto/a de Programa",
     "Vem aqui rapidinho?",
     "Sei l??, desligou do nada!",
     "N??o fiz nada", "Aceita cheque?",
     "Backup? N??o ?? autom??tico?",
     "Voc?? fazer rapidinho, ?? bem simples???",
     "Precisa abrir chamado?",
     "Me ajuda a hackear um Facebook?",
     "Voc?? formata computador?",
     "Meu computador t?? com a ???mem??ria??? cheia???",
     "O rapaz do computador vem aqui",
     "Caiu a net!", "Instala Skygato?",
     "Atende aos domingos?",
     "Voc?? faz programa?",
     "Filho, me ajuda a usar o zap?",
     "Formata meu celular?",
     "S?? fez isso? T?? muito caro!",
     "?? s?? uma altera????ozinha???",
     "Voltou a funcionar, acho que ?? sua presen??a",
     "Oi, meu computador t?? ???mexendo??? sozinho",
     "S?? parou de funcionar depois que voc?? mexeu"
    ]
  end

  def array
    [*1..10]
  end

end
