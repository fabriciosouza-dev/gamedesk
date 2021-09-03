class CreateYields < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Yield.table_name
      create_table Yield.table_name do |t|
        t.integer :assignee_id, comment: 'Identifica o id do funcionario'
        t.integer :level, default: 0, comment: 'Identifica o nível do funcionario'
        t.numeric :xp, default: 0, comment: 'Identifica o xp do funcionario'
        t.timestamps
      end
    end
    add_foreign_key Yield.table_name, User.table_name, column: :assignee_id, primary_key: :assignee_id

  end
end
