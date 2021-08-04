class Achievement < ApplicationRecord
  self.table_name = "gamedesk.achievements"

  has_one_attached :image
end
