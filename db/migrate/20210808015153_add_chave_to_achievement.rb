class AddChaveToAchievement < ActiveRecord::Migration[5.2]
  def change
    if table_exists? Achievement.table_name
      unless column_exists? Achievement.table_name, :chave
        add_column Achievement.table_name, :chave, :string
      end
      unless column_exists? Achievement.table_name, :order
        add_column Achievement.table_name, :order, :integer
      end
    end
  end
end
