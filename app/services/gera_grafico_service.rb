class GeraGraficoService
  def initialize(params)
    @tickets = params[:tickets]
  end

  def pizza_chamados_totais
    group = @tickets.group_by { |z| z.status }.map { |x| { status: x[0], count: x[1].size } }
    grafico = { labels: group.map { |x| Util.translate_enum_name(Ticket, :statuses, x[:status]) },
                datasets: [{ label: 'Status dos Chamados',
                             data: group.map { |x| x[:count] },
                             backgroundColor: Util.colors,
                             hoverOffset: 4
                           }]
    }
    grafico
  end

  def barra_priority_chamados

    group_priority = @tickets.group_by { |z| z.priority }

    prioridades = group_priority.map { |x| x[0] }

    group = Ticket.priorities.to_a.map { |x| { priority: x[0], count: 0 } }
                  .select { |z| prioridades.include? z[:priority] }

    group_priority.each do |priority|
      group.each do |row|
        row[:count] = priority[1].size if priority[0] == row[:priority]
      end
    end

    array = []

    group.each_with_index do |row, index|
      array << {
        label: Util.translate_enum_name(Ticket, :priorities, row[:priority]),
        data: [row[:count]],
        backgroundColor: Util.colors[index],
        hoverOffset: 4
      }
    end

    { labels: ['Prioridades'], datasets: array }

  end

  private

end