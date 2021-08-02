class Yield < ApplicationRecord
  self.table_name = "gamedesk.yields"
  has_one :user, class_name: "User", foreign_key: :assignee_id, primary_key: :assignee_id
end
