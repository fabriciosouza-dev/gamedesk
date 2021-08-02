class Requester < ApplicationRecord
  self.table_name = "gamedesk.requesters"

  has_many :tickets, class_name: "Ticket", foreign_key: :requester_id, primary_key: :requester_id
end
