class CreateUserAchievements < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? UserAchievement.table_name
      create_table UserAchievement.table_name do |t|
        t.numeric :assignee_id, comment: 'Identifica o funcionario'
        t.integer :achievement_id, comment: 'Identifica o relacionamento da conquista'
        t.timestamps
      end
    end
  end
end
