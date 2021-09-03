class Ticket < ApplicationRecord
  self.table_name = "gamedesk.tickets"

  has_many :comments, class_name: "Comment", foreign_key: :ticket_id
  belongs_to :user, class_name: "User", foreign_key: :assignee_id, primary_key: :assignee_id
  #
  # enum status: {
  #   aberto: "open",
  #   resolvido: "solved",
  #   pendente: "pending",
  #   fechado: "closed",
  # }
  enum status: {
    novo: 10,
    retorno: 20,
    admitido: 30,
    confirmado: 40,
    atribuido: 50,
    aguardando_teste_prod: 70,
    resolvido: 80,
    fechado: 90,
    aguardando_desenvolvimento: 51,
    desenvolvimento: 52,
    teste_interno_hmg: 55,
    aguardando_deploy_prod: 60,
    aguardando_code_review: 56,
    aguardando_deploy_hmg: 57,
    aguardando_teste_hmg: 58,
    teste_interno_prod: 59,
  }

  enum priority: {
    nenhuma: "nenhuma",
    baixa: "baixa",
    normal: "normal",
    alta: "alta",
    urgente: "urgente",
    imediato: "imediato",
  }
end