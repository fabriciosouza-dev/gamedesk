class CreateAchievements < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Achievement.table_name
      create_table Achievement.table_name do |t|
        t.string :name, comment: 'Identifica o nome do icone'
        t.string :regra, comment: 'Identifica a regra do icone'
        t.string :descricao, comment: 'Identifica a descrição do icone'
        t.integer :status, default: 1, comment: 'Identifica se ativo ou inativo para o funcionario 0-Inativo 1-Ativo'
        t.timestamps
      end
    end
  end
end
