namespace :popula_conquistas_mantis do
  # rake popula_conquistas_mantis:execute
  desc "a new task to be executed"
  task execute: :environment do
    Achievement.destroy_all
    images.each.with_index(1) do |image, index|
      achiviement = Achievement.new(name: image[:name], regra: image[:regra], descricao: image[:descricao], status: 1, chave: image[:chave], order: index)
      achiviement.image.attach(io: File.open("#{Rails.root.join("app/assets/images/achievements/#{image[:image]}")}"), filename: image[:image].gsub('.png', ''))
      achiviement.save
    end
  end

  def images
    [
      { image: '1.png', name: 'Nível 1', regra: 'object_yield[:level] >= 1', descricao: 'Jogador conquistou o nível 1', chave: 'nivel_1' },
      { image: '3.png', name: 'Nível 3', regra: 'object_yield[:level] >= 3', descricao: 'Jogador conquistou o nível 3', chave: 'nivel_3' },
      { image: '5.png', name: 'Nível 5', regra: 'object_yield[:level] >= 5', descricao: 'Jogador conquistou o nível 5', chave: 'nivel_5' },
      { image: '7.png', name: 'Nível 7', regra: 'object_yield[:level] >= 7', descricao: 'Jogador conquistou o nível 7', chave: 'nivel_7' },
      { image: '9.png', name: 'Nível 9', regra: 'object_yield[:level] >= 9', descricao: 'Jogador conquistou o nível 9', chave: 'nivel_9' },
      { image: 'level_up.png', name: 'Level Up', regra: 'object_yield[:level] >= 15', descricao: 'Jogador conseguiu o nível acima do 15', chave: 'level_up' },
      { image: 'clock.png', name: 'Corrida Contra o Tempo', regra: %Q[Ticket.find_by_sql(["SELECT
                                                                                           t.assignee_id, date_trunc('day', t.closed_at),count(*)
                                                                                           FROM gamedesk.tickets t
                                                                                           WHERE t.status = '#{Ticket.statuses[:resolvido]}'
                                                                                           and assignee_id = :assignee_id
                                                                                             group by t.assignee_id, date_trunc('day', t.closed_at)",
                                     { assignee_id: @assignee_id }]).map{|x| x[:count] >= 10}.any?], descricao: 'Jogador resolveu 10 chamados no mesmo dia', chave: 'corrida_contra_tempo' },
      { image: 'fast.png', name: 'Alta Prioridade', regra: %Q[Ticket.find_by_sql(["SELECT
                                                                                           t.assignee_id, date_trunc('day', t.closed_at),count(*)
                                                                                           FROM gamedesk.tickets t
                                                                                           WHERE t.status = '#{Ticket.statuses[:resolvido]}'
                                                                                           and priority in ('alta','urgente','imediato')
                                                                                           and assignee_id = :assignee_id
                                                                                             group by t.assignee_id, date_trunc('day', t.closed_at)",
                                     { assignee_id: @assignee_id }]).map{|x| x[:count] >= 3}.any?], descricao: 'Jogador resolveu 3 chamados de alta prioridade(alto/urgente/imediato) no mesmo dia', chave: 'alta_prioridade' },
      { image: 'finish_line.png', name: '10/10',
        regra: %Q[Ticket.where(status: '#{Ticket.statuses[:resolvido]}', assignee_id: @assignee_id).size == Ticket.where(assignee_id: @assignee_id).size],
        descricao: 'Jogador resolveu todos os chamados atríbuidos a ele', chave: 'dez_dez' },
      { image: 'goal.png', name: 'Bala no Alvo',
        regra: %Q[Ticket.find_by_sql(["SELECT *
					                             FROM gamedesk.tickets t
                                       WHERE open_at >= date_trunc('day', CURRENT_DATE)
                                       AND assignee_id = :assignee_id",
                                     { assignee_id: @assignee_id }]).size == 0 && Time.now.hour >= 18],
        descricao: 'Terminar o dia sem chamados', chave: 'bala_no_alvo' },
      { image: 'graph.png', name: 'Trabalho com Gráficos',
        regra: %Q[Ticket.find_by_sql(["SELECT *
					                               FROM gamedesk.tickets t
                                        WHERE closed_at >= date_trunc('month', CURRENT_DATE)
                                        AND assignee_id = :assignee_id",
                                     { assignee_id: @assignee_id }]).count >= 400],
        descricao: 'Fechar 400 chamados no mês', chave: 'trabalho_com_graficos' },
      { image: 'mountain.png', name: 'Um passo de cada Vez',
        regra: %Q[Ticket.find_by_sql(["SELECT *
					                               FROM gamedesk.tickets t
                                        WHERE status = '#{Ticket.statuses[:resolvido]}'
					                              AND priority in ('alta','urgente','imediato')
                                        AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).count > 0], descricao: 'Fechou seu primeiro chamado de alta prioridade(alto/urgente/imediato)', chave: 'um_passo_cada_vez' },
      { image: 'rocket.png', name: 'Foguete não tem Ré', regra: %Q[Ticket.find_by_sql(["SELECT
                                                                                           t.assignee_id, date_trunc('day', t.closed_at),count(*)
                                                                                           FROM gamedesk.tickets t
                                                                                           WHERE t.status = '#{Ticket.statuses[:resolvido]}'
                                                                                           and priority in ('alta','urgente','imediato')
                                                                                           and assignee_id = :assignee_id
                                                                                             group by t.assignee_id, date_trunc('day', t.closed_at)",
                                     { assignee_id: @assignee_id }]).map{|x| x[:count] >= 10}.any?], descricao: 'Jogador resolveu 10 chamados de alta prioridade(alto/urgente/imediato) no mesmo dia', chave: 'foguete_nao_tem_re' },
      { image: 'ninja.png', name: "I'm NINJA", regra: %Q[Ticket.find_by_sql(["SELECT date_trunc('day', closed_at),
                                                                               count(*)
                                                                               FROM gamedesk.tickets t
                                                                               WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                               and priority in ('alta','urgente','imediato')
                                                                               AND assignee_id = :assignee_id
                                                                               group by 1",
                                      { assignee_id: @assignee_id }]).map { |x| x[:count] >= 5 }.any?], descricao: 'Jogador resolveu 5 chamados de alta prioridade(alto/urgente/imediato) no mesmo dia', chave: 'im_ninja' },
      { image: 'role-model.png', name: 'My Man', regra: 'a definir', descricao: 'Fechou ao menos dois chamados por dia por 5 dias consecutivos', chave: 'my_man' },
      { image: 'siren.png', name: 'URGENTE!!!', regra: %Q[Ticket.find_by_sql(["with table_1 as (SELECT
                                                                                                 t.assignee_id,count(*)
                                                                                                 FROM gamedesk.tickets t
                                                                                                 WHERE t.status = '#{Ticket.statuses[:resolvido]}'
                                                                                                 and t.priority in ('alta','urgente','imediato')
                                                                                                 and closed_at >= date_trunc('month', CURRENT_DATE)
                                                                                                   group by t.assignee_id order by count desc),
                                                                                    table_2 as (select count
                                                                                                FROM table_1)
                                                                                        select * from table_1
                                                                                        where count = (select max(count) from table_2
                                                                                        where assignee_id = :assignee_id)",
                                      { assignee_id: @assignee_id }]).present? and Date.today.end_of_month == Date.today], descricao: 'Jogador fechou o mês com mais chamados de alta prioridade(alto/urgente/imediato) que os demais jogadores', chave: 'urgente' },
      { image: 'speed.png', name: 'Atrasado', regra: 'a definir', descricao: 'Atrasou 15 ou mais dias na entrega de um chamado', chave: 'atrasado' },
      { image: 'success.png', name: 'Sucesso', regra: %Q[Ticket.find_by_sql(["with table_1 as (SELECT
                                                                                                 t.assignee_id, t.status,count(*)
                                                                                                 FROM gamedesk.tickets t
                                                                                                 WHERE assignee_id = :assignee_id
                                                                                                 and t.status in ('#{Ticket.statuses[:atribuido]}', '#{Ticket.statuses[:resolvido]}')
                                                                                                 and (t.closed_at >= date_trunc('month', CURRENT_DATE) or t.closed_at is null)
                                                                                                   group by t.assignee_id, t.status),
                                                                                               table_2 as (select count
                                                                                                           FROM table_1)
                                                                                                   select * from table_1
                                                                                                   where count = (select max(count) from table_2)",
                                      { assignee_id: @assignee_id }]).all?{|x| x[:status] == '#{Ticket.statuses[:resolvido]}'} and Date.today.end_of_month == Date.today], descricao: 'Finalizar o mês com saldo positivo(mais chamados fechados que abertos)', chave: 'sucesso' },
      { image: 'medal.png', name: 'Medalha por Persistência', regra: %Q[Ticket.find_by_sql(["SELECT count(*) as qtd
                                                                                              FROM gamedesk.tickets t
                                                                                              WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                                              AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).first[:qtd] >= 100], descricao: 'Fechou ao todo 100 chamados', chave: 'medalha_por_persistencia' },
      { image: 'willpower.png', name: 'We have the POWER', regra: %Q[Ticket.find_by_sql(["SELECT count(*) as qtd
                                                                                              FROM gamedesk.tickets t
                                                                                              WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                                              AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).first[:qtd] >= 250], descricao: 'Fechou ao todo 250 chamados', chave: 'we_have_power' },
      { image: 'trophy.png', name: 'Troféu', regra: %Q[Ticket.find_by_sql(["SELECT count(*) as qtd
                                                                                              FROM gamedesk.tickets t
                                                                                              WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                                              AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).first[:qtd] >= 500], descricao: 'Fechou ao todo 500 chamados', chave: 'trofeu' },
      { image: 'star.png', name: 'Aqui sua Estrela', regra: %Q[Ticket.find_by_sql(["SELECT count(*) as qtd
                                                                                              FROM gamedesk.tickets t
                                                                                              WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                                              AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).first[:qtd] >= 1000], descricao: 'Fechou ao todo 1000 chamados', chave: 'aqui_sua_estrela' },
      { image: 'wreath.png', name: 'Aqui sua Guirlanda', regra: %Q[Ticket.find_by_sql(["SELECT count(*) as qtd
                                                                                              FROM gamedesk.tickets t
                                                                                              WHERE status = '#{Ticket.statuses[:resolvido]}'
                                                                                              AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).first[:qtd] >= 1500], descricao: 'Fechou ao todo 1500 chamados', chave: 'aqui_sua_guirlanda' },
    ]
  end
end
