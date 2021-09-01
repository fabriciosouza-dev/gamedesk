class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update destroy ]

  # GET /profiles or /profiles.json
  def index
    @profile = User.find_by(assignee_id: current_user.assignee_id)
    @profile.origem = :profile
    @regras = regras
    @user_achievements = UserAchievement.where(assignee_id: current_user.assignee_id)
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
      { objetivo: 'Se a prioridade for urgente e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 15, class: '' },
      { objetivo: '1 dia depois', ponto: 13, class: '' },
      { objetivo: '2 a 7 dias', ponto: 11, class: '' },
      { objetivo: '8 a 30 dias', ponto: 9, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 7, class: '' },
      { objetivo: 'Se a prioridade for alta e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 13, class: '' },
      { objetivo: '1 dia depois', ponto: 11, class: '' },
      { objetivo: '2 a 7 dias', ponto: 9, class: '' },
      { objetivo: '8 a 30 dias', ponto: 7, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 5, class: '' },
      { objetivo: 'Se a prioridade for normal e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 11, class: '' },
      { objetivo: '1 dia depois', ponto: 9, class: '' },
      { objetivo: '2 a 7 dias', ponto: 7, class: '' },
      { objetivo: '8 a 30 dias', ponto: 5, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 3, class: '' },
      { objetivo: 'Se a prioridade for baixa e for resolvida:', ponto: nil, class: 'background-grey' },
      { objetivo: 'No mesmo dia de criação', ponto: 9, class: '' },
      { objetivo: '1 dia depois', ponto: 7, class: '' },
      { objetivo: '2 a 7 dias', ponto: 5, class: '' },
      { objetivo: '8 a 30 dias', ponto: 3, class: '' },
      { objetivo: 'Acima de 30 dias', ponto: 1, class: '' }
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
