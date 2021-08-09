namespace :executa_popula_tabelas do
  # rake executa_popula_tabelas:execute
  desc "a new task to be executed"
  task execute: :environment do
    PopulaTabelaService.new(nil).execute
  end
end
