class RewardsController < ApplicationController
  before_action :set_reward, only: %i[ show edit update destroy ]

  # GET /rewards or /rewards.json
  def index
    @rewards = Reward.all
  end

  # GET /rewards/1 or /rewards/1.json
  def show
  end

  # GET /rewards/new
  def new
    @reward = Reward.new
  end

  # GET /rewards/1/edit
  def edit
  end

  # POST /rewards or /rewards.json
  def create
    @reward = Reward.new(reward_params)

    respond_to do |format|
      if @reward.save
        format.html { redirect_to rewards_path }
        format.json { render :show, status: :created, location: @reward }
        flash[:success] = "Criado com sucesso!"
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reward.errors, status: :unprocessable_entity }
        flash[:error] = "Não foi possível criar o registro!"
      end
    end
  end

  # PATCH/PUT /rewards/1 or /rewards/1.json
  def update
    respond_to do |format|
      if @reward.update(reward_params)
        format.html { redirect_to rewards_path }
        format.json { render :show, status: :ok, location: @reward }
        flash[:success] = "Atualizado com sucesso!"
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reward.errors, status: :unprocessable_entity }
        flash[:error] = "Não foi possível atualizar o registro!"
      end
    end
  end

  # DELETE /rewards/1 or /rewards/1.json
  def destroy
    @reward.destroy
    respond_to do |format|
      format.html { redirect_to rewards_url, notice: "Reward was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_reward
    @reward = Reward.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def reward_params
    params.require(:reward).permit(:name, :descricao, :dta_inicio, :dta_fim, :status,
                                   type_associations_attributes: [:id, :type_rule_id, :_destroy])
  end
end
