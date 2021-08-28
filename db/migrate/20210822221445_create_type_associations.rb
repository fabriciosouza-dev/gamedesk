class CreateTypeAssociations < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? TypeAssociation.table_name
      create_table TypeAssociation.table_name do |t|
        t.integer :type_rule_id
        t.string :regra
        t.integer :status
        t.string :priority
        t.integer :quantidade
        t.timestamp :dta_inicio
        t.timestamp :dta_fim
        t.timestamps
      end
    end
    unless (column_exists? TypeAssociation.table_name, :origem_id) &&
      (column_exists? TypeAssociation.table_name, :origem_type)
      add_reference TypeAssociation.table_name, :origem, polymorphic: true, index: true
    end

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
