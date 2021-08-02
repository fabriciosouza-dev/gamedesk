class CreateRequesters < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Requester.table_name
      create_table Requester.table_name do |t|
        t.string :name, comment: 'Identifica o nome do funcionario'
        t.string :email, comment: 'Identifica o email do funcionario'
        t.string :phone, comment: 'Identifica o telefone do funcionario'
        t.numeric :requester_id, comment: 'Identifica o id do zendesk funcionario'
        t.integer :status, default: 1, comment: 'Identifica se ativo ou inativo o funcionario 0-Inativo 1-Ativo'
        t.timestamps
      end
    end
  end
end
