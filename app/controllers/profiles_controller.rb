class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show edit update destroy ]

  # GET /profiles or /profiles.json
  def index
    @profile = User.find_by(assignee_id: current_user.assignee_id)
    @profile.origem = :profile
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

  # Use callbacks to share common setup or constraints between actions.
  def set_profile
    @profile = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def profile_params
    params.require(:profile).permit(:admin, :email, :image, :name, :password, :password_confirmation)
  end
end
