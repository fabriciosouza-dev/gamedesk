class CreateUserRewards < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? UserReward.table_name
      create_table UserReward.table_name do |t|
        t.integer :assignee_id, comment: 'Identifica o funcionario'
        t.integer :reward_id, comment: 'Identifica o relacionamento da conquista'
        t.timestamps
      end
      add_foreign_key UserReward.table_name, User.table_name, column: :assignee_id, primary_key: :assignee_id
      add_foreign_key UserReward.table_name, Reward.table_name, column: :reward_id
    end
  end
end
