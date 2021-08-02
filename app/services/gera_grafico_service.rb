class GeraGraficoService
  def initialize(params)
    @tickets = params[:tickets]
  end

  def execute
    group = @tickets.group_by { |z| z.status }.map { |x| { status: x[0], count: x[1].size } }
    grafico = { labels: group.map { |x| Util.translate_enum_name(Ticket, :statuses, x[:status]) }, datasets: [{ label: 'Status dos Chamados',
                                                                                                           data: group.map { |x| x[:count] },
                                                                                                           backgroundColor: ['#EB870E', '#464646', '#7678ED', '#08A045', '#DB162F'],
                                                                                                           hoverOffset: 4
                                                                                                         }]
    }
    grafico
  end

end