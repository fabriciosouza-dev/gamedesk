class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update destroy ]

  # GET /profiles or /profiles.json
  def index
    @profile = User.find_by(assignee_id: current_user.assignee_id)
    @profile.origem = :profile
    @regras = regras
    @user_achievements = UserAchievement.eager_load(:achievement)
                                        .where(assignee_id: current_user.assignee_id)
    @user_rewards = UserReward.eager_load(reward: :type_association)
                              .where(assignee_id: current_user.assignee_id)

  end

  # GET /profiles/1 or /profiles/1.json
  def show
  end

  # GET /profiles/1/edit
  def edit
  end

  # PATCH/PUT /profiles/1 or /profiles/1.json
  def update
    if params[:profile][:password].blank? && params[:profile][:password_confirmation].blank?
      params[:profile].extract!(:password, :password_confirmation)
    end
    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to profiles_path }
        format.json { render :show, status: :ok, location: @profile }
        flash[:success] = "Atualizado com sucesso!"

      else
        format.html { render :index, status: :unprocessable_entity }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
        flash[:error] = "Não foi possível atualizar o registro!"
      end
    end
  end

  private

  def regras
    [
      { objetivo: 'Chamado atribuido', ponto: 1, class: '' },
      { objetivo: 'Resolução do chamado', ponto: 2, class: '' },
      { objetivo: 'Adicionou comentarios /por comentário', ponto: 1, class: '' },
      { objetivo: 'Se a prioridade for <b>IMEDIATA</b> e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 20, class: '' },
      { objetivo: '1 dia depois', ponto: 18, class: '' },
      { objetivo: '2 a 7 dias', ponto: 16, class: '' },
      { objetivo: '8 a 30 dias', ponto: 14, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 12, class: '' },
      { objetivo: 'Se a prioridade for <b>URGENTE</b> e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 18, class: '' },
      { objetivo: '1 dia depois', ponto: 16, class: '' },
      { objetivo: '2 a 7 dias', ponto: 14, class: '' },
      { objetivo: '8 a 30 dias', ponto: 12, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 10, class: '' },
      { objetivo: 'Se a prioridade for <b>ALTA</b> e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 16, class: '' },
      { objetivo: '1 dia depois', ponto: 14, class: '' },
      { objetivo: '2 a 7 dias', ponto: 12, class: '' },
      { objetivo: '8 a 30 dias', ponto: 10, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 8, class: '' },
      { objetivo: 'Se a prioridade for <b>NORMAL</b> e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 14, class: '' },
      { objetivo: '1 dia depois', ponto: 12, class: '' },
      { objetivo: '2 a 7 dias', ponto: 10, class: '' },
      { objetivo: '8 a 30 dias', ponto: 8, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 6, class: '' },
      { objetivo: 'Se a prioridade for <b>BAIXA</b> e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 12, class: '' },
      { objetivo: '1 dia depois', ponto: 10, class: '' },
      { objetivo: '2 a 7 dias', ponto: 8, class: '' },
      { objetivo: '8 a 30 dias', ponto: 6, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 4, class: '' }
    ]
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_profile
    @profile = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def profile_params
    params.require(:profile).permit(:admin, :email, :image, :name, :password, :password_confirmation)
  end
end
