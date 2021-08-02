class CreateComments < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Comment.table_name
      create_table Comment.table_name do |t|
        t.integer :ticket_id, comment: 'Identifica o id do pai ticket do comentario'
        t.numeric :comment_id, comment: 'Identifica o comment_id do comentario'
        t.string :body, comment: 'Identifica o corpo do comentario'
        t.string :html_body, comment: 'Identifica o html_body do comentario'
        t.string :ip_address, comment: 'Identifica o ip do comentario'
        t.string :location, comment: 'Identifica a localização do comentario'
        t.integer :public, comment: 'Identifica se é publico o comentario'
        t.integer :flag_game, default: 0, comment: 'Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim'
        t.timestamp :open_at, comment: 'Identifica o horario de abertura do comentario'
        t.timestamps
      end
    end
  end
end
