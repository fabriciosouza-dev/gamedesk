class CreateUserRewards < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? UserReward.table_name
      create_table UserReward.table_name do |t|
        t.numeric :assignee_id, comment: 'Identifica o funcionario'
        t.integer :reward_id, comment: 'Identifica o relacionamento da conquista'
        t.timestamps
      end
    end
  end
end
