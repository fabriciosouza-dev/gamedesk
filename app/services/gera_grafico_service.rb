class GeraGraficoService
  def initialize(params)
    @tickets = params[:tickets]
  end

  def pizza_chamados_totais
    group = @tickets.group_by { |z| z.status }.map { |x| { status: x[0], count: x[1].size } }
    grafico = { labels: group.map { |x| Util.translate_enum_name(Ticket, :statuses, x[:status]) },
                datasets: [{ label: 'Status dos Chamados',
                             data: group.map { |x| x[:count] },
                             backgroundColor: ['#EB870E', '#464646', '#7678ED', '#08A045', '#DB162F'],
                             hoverOffset: 4
                           }]
    }
    grafico
  end

  def barra_priority_chamados
    group = [
      { priority: "baixo", count: 0 },
      { priority: "normal", count: 0 },
      { priority: "alta", count: 0 },
      { priority: "urgente", count: 0 },
    ]

    @tickets.group_by { |z| z.priority }.each do |priority|
      group.each do |row|
        row[:count] = priority[1].size if priority[0] == row[:priority]
      end
    end
    grafico = { labels: group.map { |x| Util.translate_enum_name(Ticket, :prioritys, x[:priority]) },
                datasets: [{ label: 'Prioridade dos Chamados Resolvidos',
                             data: group.map { |x| x[:count] },
                             backgroundColor: ['#EB870E', '#464646', '#7678ED', '#08A045', '#DB162F'],
                             hoverOffset: 4
                           }]
    }
    grafico
  end

end