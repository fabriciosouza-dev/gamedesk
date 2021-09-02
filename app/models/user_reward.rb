class UserReward < ApplicationRecord
  self.table_name = "gamedesk.user_rewards"

  belongs_to :reward, class_name: "Reward", foreign_key: :reward_id
  has_one :user, class_name: "User", foreign_key: :assignee_id, primary_key: :assignee_id
end
