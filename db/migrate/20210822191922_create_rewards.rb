class CreateRewards < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Reward.table_name
      create_table Reward.table_name do |t|
        t.string :name, comment: 'Identifica o nome da recompensa'
        t.string :descricao, comment: 'Identifica a descrição da recompensa'
        t.integer :status, default: 1, comment: 'Identifica se ativo ou inativo a recompensa 0-Inativo 1-Ativo'
        t.timestamps
      end
    end
  end
end
