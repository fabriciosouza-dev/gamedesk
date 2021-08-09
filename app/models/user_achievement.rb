class UserAchievement < ApplicationRecord
  self.table_name = "gamedesk.user_achievements"

  belongs_to :achievement, class_name: "Achievement", foreign_key: :achievement_id
  belongs_to :user, class_name: "User", foreign_key: :assignee_id, primary_key: :assignee_id
end
