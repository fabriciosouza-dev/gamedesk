class CreateTypeAssociations < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? TypeAssociation.table_name
      create_table TypeAssociation.table_name do |t|
        t.integer :type_rule_id
        t.timestamps
      end
    end
    unless (column_exists? TypeAssociation.table_name, :origem_id) &&
      (column_exists? TypeAssociation.table_name, :origem_type)
      add_reference TypeAssociation.table_name, :origem, polymorphic: true, index: true
    end
  end
end
