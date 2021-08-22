class CreateTypeRules < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? TypeRule.table_name
      create_table TypeRule.table_name do |t|
        t.string :name, comment: 'Identifica o nome do tipo de recompensa'
        t.string :chave, comment: 'Identifica a chave do tipo de recompensa'
        t.string :descricao, comment: 'Identifica a descrição do tipo de recompensa'
        t.integer :status, default: 1, comment: 'Identifica se ativo ou inativo o tipo de recompensa 0-Inativo 1-Ativo'
        t.timestamps
      end
    end
  end
end
