class Comment < ApplicationRecord
  self.table_name = "gamedesk.comments"

  belongs_to :ticket, class_name: "Ticket", foreign_key: :ticket_id
end
