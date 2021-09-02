class ExecutaRecompensasService
  def initialize(params)
    @assignee_id = params[:assignee_id]
  end

  def execute

    array = []
    aviso_recompensas = []
    if @assignee_id.present?
      Reward.where(status: 1).each do |reward|
        dta_fim = reward.type_association.dta_fim
        if reward&.type_association&.regra.present?

        else
          sql = <<-SQL
                SELECT *
                  FROM gamedesk.tickets t
                 WHERE t.status = 'solved'
                   AND t.assignee_id = :assignee_id
          SQL

          sql += " and t.closed_at >= '#{reward&.type_association&.dta_inicio}'" if reward&.type_association&.dta_inicio.present?
          sql += " and t.closed_at <= '#{dta_fim}'" if dta_fim.present?
          sql += " and priority in (#{junta_prioridades(reward&.type_association&.priority)})" if reward&.type_association&.priority.present?
        end

        qtd = Ticket.find_by_sql([sql, { assignee_id: @assignee_id }]).size
        qtd_reward = reward&.type_association&.quantidade

        if qtd.to_i >= qtd_reward.to_i
          user_reward = UserReward.find_by(assignee_id: @assignee_id, reward_id: reward.id)
          unless user_reward.present?
            UserReward.create(assignee_id: @assignee_id, reward_id: reward.id)
            aviso_recompensas << "Você ganhou: '#{reward.recompensa}'!!"
          end
        else
          reward.qtd_user = qtd
          reward.qtd_reward = qtd_reward
          reward.color = return_hash(qtd, qtd_reward)[:color]
          reward.order = return_hash(qtd, qtd_reward)[:order]
          reward.percentage = Util.percent(qtd, qtd_reward).round(2)
          array << reward if (dta_fim.to_date + 7.days) > Date.today
        end
      end
    end
    return array, aviso_recompensas
  end

  def junta_prioridades(value)
    array = []
    value.split(',').each do |row|
      array << Ticket.priorities[row]
    end

    array.map { |x| "'" + x + "'" }.join(',')
  end

  def return_hash(qtd_user, qtd_reward)
    porcentagem = Util.percent(qtd_user, qtd_reward).round(2)

    if porcentagem == 100
      { order: 3, color: "success" }
    elsif porcentagem >= 50
      { order: 2, color: "warning" }
    else
      { order: 1, color: "danger" }
    end

  end

  def percentage(value, total)
    return 0 unless total.present?
    (value * 100) / total
  end

end