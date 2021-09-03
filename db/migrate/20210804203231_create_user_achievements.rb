class CreateUserAchievements < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? UserAchievement.table_name
      create_table UserAchievement.table_name do |t|
        t.integer :assignee_id, comment: 'Identifica o funcionario'
        t.integer :achievement_id, comment: 'Identifica o relacionamento da conquista'
        t.timestamps
      end
      add_foreign_key UserAchievement.table_name, User.table_name, column: :assignee_id, primary_key: :assignee_id
      add_foreign_key UserAchievement.table_name, Achievement.table_name, column: :achievement_id

    end
  end
end
