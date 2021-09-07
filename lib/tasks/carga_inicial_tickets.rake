namespace :carga_inicial_tickets do
  # rake carga_inicial_tickets:execute
  desc "popular tabela de tickets"
  task execute: :environment do
    PopulaTabelaMantisService.new({ dta_inicio: '01/01/2021' }).execute
  end
end
