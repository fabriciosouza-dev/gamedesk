class DashboardsController < ApplicationController
  def index
    if current_user.admin?
      users = User.all
      tickets = Ticket.all.order(updated_at: :desc)
      @rank = Yield.eager_load(:user).all.order(level: :desc, xp: :desc).take(5)
      @nmr_admins = users.where(admin: true).size
      @nmr_users = users.size
    else
      tickets = Ticket.where(assignee_id: current_user.assignee_id).order(updated_at: :desc)
    end
    @grafico = GeraGraficoService.new(tickets: tickets).pizza_chamados_totais
    @grafico_priority_chart = GeraGraficoService.new(tickets: tickets).barra_priority_chamados
    @last_24h_tickets = tickets.where('open_at >= ?', 24.hours.ago).size
    @last_tickets = tickets.where(status: [:atribuido, :aguardando_desenvolvimento]).take(6)
    @nmr_tickets = tickets.size
  end

  def popula_tabela_service
    PopulaTabelaMantisService.new({}).execute
    render json: { success: 'ok' }, status: 202
  end
end
