module UserRewardsHelper
  def cria_modulo(objeto)
    finalizou = @user_rewards.map(&:reward_id).include?(objeto.id)
    regra = regra_data(objeto.type_association.dta_fim, finalizou)
    html = <<-HTML
      <div class="col-md-4 col-lg-4">
      <div class="card #{regra[:pulse]} #{regra[:card]}" style="margin: 20px">
        <div class="card-header">
          <div class="container">
            <div class="row justify-content-center">
              <h4 class="text-align-center no-padding">#{objeto.name}</h4>
            </div>
            <div class="row justify-content-center">
              <span class="btn #{regra[:btn]}" data-placement="bottom" data-toggle="tooltip" title="" 
                    data-original-title="Recompensa">#{objeto.recompensa}</span>
            </div>
          </div>
        </div>
        <div class="card-body">
            <div class="row justify-content-center">
              <p style="font-size: 16px" class="text-align-center margin-top-15 #{regra[:class_prazo]}">#{regra[:prazo]}</p>
            </div>
            #{progress(objeto.qtd_user, objeto.qtd_reward, objeto.color, 25)}
        </div>
      </div>
    </div>
    HTML
    return html
  end

  def regra_data(dta_fim, finalizou)
    encerrou = Time.now.strftime("%FT%T") > dta_fim.strftime("%FT%T")
    encerra_hoje = Date.today == dta_fim.to_date

    if encerrou and !finalizou
      { card: 'card-dark', btn: 'btn-outline-dark', pulse: '', prazo: 'ENCERRADO', class_prazo: 'font-weight-bold' }
    elsif encerra_hoje and !finalizou
      { card: 'card-danger', btn: 'btn-light', pulse: 'pulse-danger', prazo: "Encerra HOJE (#{dta_fim.strftime("%T")})" }
    elsif finalizou
      { card: 'card-success', btn: 'btn-outline-success', pulse: '', prazo: 'Concluído com Sucesso!' }
    else
      { card: 'card-info', btn: 'btn-light', pulse: 'pulse-info', prazo: "Encerra: #{Util.format_date_br(dta_fim)}" }
    end

  end

end
