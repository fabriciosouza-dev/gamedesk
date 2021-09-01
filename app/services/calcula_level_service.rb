class CalculaLevelService
  def initialize(params)
    @new_ticket = params[:new_ticket]
    @old_ticket = params[:old_ticket]
    @new_comments = params[:new_comments]
    @old_comments = params[:old_comments]
  end

  def execute
    #regras do jogo
    # **Chamado atribuido 1 ponto
    # **Resolução do chamado 2 pontos
    # **Adicionou comentarios 1 ponto para cada comentario
    # **Se a prioridade for urgente e for resolvida:
    # no mesmo dia de criação 15 pontos
    # 1 dia depois 10 pontos
    # 2 a 7 dias 8 pontos
    # 8 a 30 dias 5 pontos
    # **Se a prioridade for alta e for resolvida:
    # no mesmo dia de criação 10 pontos
    # 1 dia depois 8 pontos
    # 2 a 7 dias 5 pontos
    # 8 a 30 dias 2 pontos
    # acima de 30 dias 1 ponto
    # **Se a prioridade for normal e for resolvida:
    # no mesmo dia de criação 5 pontos
    # 2 a 7 dias 3 pontos
    # 8 a 30 dias 1 pontos
    # acima de 30 dias 0 pontos
    # **Se a prioridade for baixa e for resolvida:
    # no mesmo dia de criação 2 pontos
    # 2 a 7 dias 1 pontos
    # acima 7 dias 0 pontos
    # Passou de 1 mês PENALIDADE dependendo da prioridade do chamado

    # Abertura de chamado 1 pontos
    pontos = 1
    object_yield = Yield.find_or_create_by(assignee_id: @new_ticket&.assignee_id.to_i)
    # Novo ticket
    if @old_ticket[:created_at].to_s == @old_ticket[:updated_at].to_s && @new_ticket.status == 'solved'
      pontos += 1
    end
    pontos += 2 * @new_comments.size
    if @old_ticket[:status] == 'solved'
      pontos += 2
      case @new_ticket.priority
      when "urgent"
        pontos += condicional_type(@old_ticket[:updated_at].to_s.to_date, @new_ticket.created_at.to_s.to_date, "urgent")
      when "high"
        pontos += condicional_type(@old_ticket[:updated_at].to_s.to_date, @new_ticket.created_at.to_s.to_date, "high")
      when "normal"
        pontos += condicional_type(@old_ticket[:updated_at].to_s.to_date, @new_ticket.created_at.to_s.to_date, "normal")
      when "low"
        pontos += condicional_type(@old_ticket[:updated_at].to_s.to_date, @new_ticket.created_at.to_s.to_date, "low")
      else
        pontos += 0
      end
      if object_yield.present?
        tickets_xp_sum = object_yield.user.tickets.where.not(id: @new_ticket.id).map(&:xp).sum
        pontos_totais = tickets_xp_sum + pontos
        level = object_yield.level
        if pontos_totais > Util.calcula_xp(level)
          object_yield.update(xp: pontos_totais, level: level + 1)
        else
          object_yield.update(xp: pontos_totais)
        end
      end
      if (@old_ticket[:updated_at] != @new_ticket[:changed_at]) || @new_ticket[:closed_at].nil?
        @new_ticket[:closed_at] = @old_ticket[:updated_at]
      end
      @new_ticket.update(xp: pontos)
    end

  end

  private

  def difference_two_dates(new_date, old_date)
    (new_date - old_date).to_i
  end

  def condicional_type(new_date, old_date, type)
    if new_date == old_date
      scale_of_points(type, 0)
    elsif difference_two_dates(old_date, new_date)
      scale_of_points(type, 1)
    elsif [2..7].include?(difference_two_dates(old_date, new_date))
      scale_of_points(type, 2)
    elsif [8..30].include?(difference_two_dates(old_date, new_date))
      scale_of_points(type, 3)
    else
      scale_of_points(type, 4)
    end
  end

  def scale_of_points(type, index)
    months = (Date.today.month - @new_ticket.open_at.to_date.month).to_i
    hash_priority = {
      urgent: [15, 10, 8, 5, progressao_aritmetica(months, 4)],
      high: [10, 8, 5, 1, progressao_aritmetica(months, 3)],
      normal: [5, 3, 1, 0, progressao_aritmetica(months, 2)],
      low: [2, 1, 0, 0, progressao_aritmetica(months, 1)]
    }
    hash_priority[type.to_sym][index]
  end

  def progressao_aritmetica(months, razao)
    (1 + (razao - 1) * months) * -1
  end

end