namespace :popula_conquistas do
  # rake popula_conquistas:execute
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
    sql = <<-SQL
        SELECT *
                FROM gamedesk.tickets t
            WHERE status = 'solved'
            AND priority = 'urgent'
            AND assignee_id = :assignee_id
    SQL
    [
      { image: '1.png', name: 'Nível 1', regra: 'object_yield[:level] >= 1', descricao: 'Jogador conquistou o nível 1', chave: 'nivel_1' },
      { image: '3.png', name: 'Nível 3', regra: 'object_yield[:level] >= 3', descricao: 'Jogador conquistou o nível 3', chave: 'nivel_3' },
      { image: '5.png', name: 'Nível 5', regra: 'object_yield[:level] >= 5', descricao: 'Jogador conquistou o nível 5', chave: 'nivel_5' },
      { image: '7.png', name: 'Nível 7', regra: 'object_yield[:level] >= 7', descricao: 'Jogador conquistou o nível 7', chave: 'nivel_7' },
      { image: '9.png', name: 'Nível 9', regra: 'object_yield[:level] >= 9', descricao: 'Jogador conquistou o nível 9', chave: 'nivel_9' },
      { image: 'level_up.png', name: 'Level Up', regra: 'object_yield[:level] >= 15', descricao: 'Jogador conseguiu o nível acima do 15', chave: 'level_up' },
      { image: 'clock.png', name: 'Corrida Contra o Tempo', regra: 'a definir', descricao: 'Jogador resolveu 10 chamados no mesmo dia', chave: 'corrida_contra_tempo' },
      { image: 'fast.png', name: 'Alta Prioridade', regra: 'a definir', descricao: 'Jogador resolveu 3 chamados de alta prioridade(alto/urgente) no mesmo dia', chave: 'alta_prioridade' },
      { image: 'finish_line.png', name: '10/10',
        regra: %q[Ticket.where(status: 'solved', assignee_id: @assignee_id).size == Ticket.where(assignee_id: @assignee_id).size],
        descricao: 'Jogador resolveu todos os chamados atríbuidos a ele', chave: 'dez_dez' },
      { image: 'goal.png', name: 'Bala no Alvo',
        regra: %q[Ticket.find_by_sql(["SELECT *
					                             FROM gamedesk.tickets t
                                       WHERE open_at >= date_trunc('day', CURRENT_DATE)
                                       AND assignee_id = :assignee_id",
                                     { assignee_id: @assignee_id }]).size == 0 && Time.now.hour >= 18],
        descricao: 'Terminar o dia sem chamados', chave: 'bala_no_alvo' },
      { image: 'graph.png', name: 'Trabalho com Gráficos',
        regra: %q[Ticket.find_by_sql(["SELECT *
					                               FROM gamedesk.tickets t
                                        WHERE closed_at >= date_trunc('month', CURRENT_DATE)
                                        AND assignee_id = :assignee_id",
                                     { assignee_id: @assignee_id }]).count >= 400],
        descricao: 'Fechar 400 chamados no mês', chave: 'trabalho_com_graficos' },
      { image: 'mountain.png', name: 'Um passo de cada Vez',
        regra: %q[Ticket.find_by_sql(["SELECT *
					                               FROM gamedesk.tickets t
                                        WHERE status = 'solved'
					                              AND priority in ('high','urgent')
                                        AND assignee_id = :assignee_id",
                                      { assignee_id: @assignee_id }]).count > 0], descricao: 'Fechou seu primeiro chamado de alta prioridade(alto/urgente)', chave: 'um_passo_cada_vez' },
      { image: 'rocket.png', name: 'Foguete não tem Ré', regra: 'a definir', descricao: 'Jogador resolveu 10 chamados de alta prioridade(alto/urgente) no mesmo dia', chave: 'foguete_nao_tem_re' },
      { image: 'ninja.png', name: "I'm NINJA", regra: 'a definir', descricao: 'Jogador resolveu 20 chamados de alta prioridade(alto/urgente) no mesmo dia', chave: 'im_ninja' },
      { image: 'role-model.png', name: 'My Man', regra: 'a definir', descricao: 'Fechou ao menos dois chamados por dia por 5 dias consecutivos', chave: 'my_man' },
      { image: 'siren.png', name: 'URGENTE!!!', regra: 'a definir', descricao: 'Jogador fechou o mês com mais chamados urgentes que os demais jogadores' },
      { image: 'speed.png', name: 'Atrasado', regra: 'a definir', descricao: 'Atrasou 15 ou mais dias na entrega de um chamado', chave: 'atrasado' },
      { image: 'success.png', name: 'Sucesso', regra: 'a definir', descricao: 'Finalizar o mês com saldo positivo(mais chamados fechados que abertos)', chave: 'sucesso' },
      { image: 'medal.png', name: 'Medalha por Persistência', regra: 'a definir', descricao: 'Fechou ao todo 100 chamados', chave: 'medalha_por_persistencia' },
      { image: 'willpower.png', name: 'We have the POWER', regra: 'a definir', descricao: 'Fechou ao todo 250 chamados', chave: 'we_have_power' },
      { image: 'trophy.png', name: 'Troféu', regra: 'a definir', descricao: 'Fechou ao todo 500 chamados', chave: 'trofeu' },
      { image: 'star.png', name: 'Aqui sua Estrela', regra: 'a definir', descricao: 'Fechou ao todo 1000 chamados', chave: 'aqui_sua_estrela' },
      { image: 'wreath.png', name: 'Aqui sua Guirlanda', regra: 'a definir', descricao: 'Fechou ao todo 1500 chamados', chave: 'aqui_sua_guirlanda' },
    ]
  end
end
