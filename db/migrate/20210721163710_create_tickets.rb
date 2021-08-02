class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Ticket.table_name
      create_table Ticket.table_name do |t|
        t.integer :ticket_id, comment: 'Identifica o id do ticket'
        t.string :subject, comment: 'Identifica o assunto do ticket'
        t.string :raw_subject, comment: 'Identifica o assunto cru do ticket'
        t.string :description, comment: 'Identifica a descrição do ticket'
        t.string :priority, comment: 'Identifica a prioridade do ticket'
        t.string :status, comment: 'Identifica o status do ticket'
        t.string :recipient, comment: 'Identifica o recebedor do ticket'
        t.numeric :requester_id, comment: 'Identifica o solicitante id do ticket'
        t.numeric :submitter_id, comment: 'Identifica o apresentador id do ticket'
        t.numeric :assignee_id, comment: 'Identifica o atribuido id do ticket'
        t.numeric :organization_id, comment: 'Identifica a organização id do ticket'
        t.numeric :group_id, comment: 'Identifica o grupo id do ticket'
        t.numeric :forum_topic_id, comment: 'Identifica o forum do ticket'
        t.numeric :problem_id, comment: 'Identifica o problema id do ticket'
        t.integer :has_incidents, comment: 'Identifica o se tem incidentes id do ticket'
        t.integer :is_public, comment: 'Identifica o se é publico o ticket'
        t.integer :allow_channelback, comment: 'Identifica se permitir canal de retorno do ticket'
        t.integer :allow_attachments, comment: 'Identifica se permitir anexos no ticket'
        t.string :satisfaction_rating, comment: 'Identifica a satisfação do ticket'
        t.numeric :ticket_form_id, comment: 'Identifica o formulario id do ticket'
        t.numeric :brand_id, comment: 'Identifica a marca do ticket'
        t.date :due_at, comment: 'Identifica o horario de devido do ticket'
        t.integer :flag_game, default: 0, comment: 'Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim'
        t.numeric :xp, default: 0, comment: 'Identifica o xp do ticket'
        t.integer :flag_calc_level, default: 0, comment: 'Identifica o ticket foi calculado level 0-não 1-sim'
        t.timestamp :open_at, comment: 'Identifica o horario de abertura do ticket'
        t.timestamp :pending_at, comment: 'Identifica o horario inicial de pendencia do ticket'
        t.timestamp :changed_at, comment: 'Identifica o horario de mudança do ticket'
        t.timestamp :closed_at, comment: 'Identifica o horario de abertura do ticket'
        t.timestamps
      end
    end
  end
end
