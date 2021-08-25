class AddColumnValueTypeAssociation < ActiveRecord::Migration[5.2]
  def change
    unless column_exists? TypeAssociation.table_name, :status
      add_column TypeAssociation.table_name, :status, :integer
    end
    unless column_exists? TypeAssociation.table_name, :priority
      add_column TypeAssociation.table_name, :priority, :string
    end
    unless column_exists? TypeAssociation.table_name, :quantidade
      add_column TypeAssociation.table_name, :quantidade, :integer
    end
    unless column_exists? TypeAssociation.table_name, :dta_inicio
      add_column TypeAssociation.table_name, :dta_inicio, :timestamp
    end
    unless column_exists? TypeAssociation.table_name, :dta_fim
      add_column TypeAssociation.table_name, :dta_fim, :timestamp
    end
    unless column_exists? TypeAssociation.table_name, :regra
      add_column TypeAssociation.table_name, :regra, :string
    end
  end
end
