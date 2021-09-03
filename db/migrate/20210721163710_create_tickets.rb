class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? Ticket.table_name
      create_table Ticket.table_name do |t|
        t.integer :ticket_id, comment: 'Identifica o id do ticket'
        t.string :priority, comment: 'Identifica a prioridade do ticket'
        t.integer :status, comment: 'Identifica o status do ticket'
        t.integer :assignee_id, comment: 'Identifica o atribuido id do ticket'
        t.integer :flag_game, default: 0, comment: 'Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim'
        t.numeric :xp, default: 0, comment: 'Identifica o xp do ticket'
        t.integer :flag_calc_level, default: 0, comment: 'Identifica o ticket foi calculado level 0-não 1-sim'
        t.timestamp :open_at, comment: 'Identifica o horario de abertura do ticket'
        t.timestamp :pending_at, comment: 'Identifica o horario inicial de pendencia do ticket'
        t.timestamp :changed_at, comment: 'Identifica o horario de mudança do ticket'
        t.timestamp :closed_at, comment: 'Identifica o horario de abertura do ticket'
        t.timestamps
      end
      add_foreign_key Ticket.table_name, User.table_name, column: :assignee_id, primary_key: :assignee_id
      add_index Ticket.table_name, :ticket_id, unique: true
    end
  end
end
