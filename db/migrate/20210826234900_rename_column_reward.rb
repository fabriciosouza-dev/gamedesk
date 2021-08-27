class RenameColumnReward < ActiveRecord::Migration[5.2]
  def change

    if table_exists? Reward.table_name
      rename_column Reward.table_name, :descricao, :recompensa
    end
  end
end
