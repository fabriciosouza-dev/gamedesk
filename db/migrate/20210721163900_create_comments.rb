class CreateComments < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Comment.table_name
      create_table Comment.table_name do |t|
        t.integer :ticket_id, comment: 'Identifica o id do pai ticket do comentario'
        t.integer :flag_game, default: 0, comment: 'Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim'
        t.timestamp :open_at, comment: 'Identifica o horario de abertura do comentario'
        t.timestamps
      end
      add_foreign_key Comment.table_name, Ticket.table_name, column: :ticket_id, primary_key: :ticket_id
    end
  end
end
