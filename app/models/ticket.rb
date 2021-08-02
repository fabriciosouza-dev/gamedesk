class Ticket < ApplicationRecord
  self.table_name = "gamedesk.tickets"

  has_many :comments, class_name: "Comment", foreign_key: :ticket_id
  belongs_to :user, class_name: "User", foreign_key: :assignee_id, primary_key: :assignee_id

  enum status: {
    aberto: "open",
    resolvido: "solved",
    pendente: "pending",
    fechado: "closed",
  }

  enum priority: {
    baixo: "low",
    normal: "normal",
    alta: "high",
    urgente: "urgent",
  }
end
