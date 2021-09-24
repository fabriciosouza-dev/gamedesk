class UsersController < ApplicationController
  load_and_authorize_resource
  before_action :set_user, only: %i[ show edit update destroy ]
  before_action :add_breadcrumb_menu, only: %i[ show edit update destroy new ]
  # before_action :permission


  # GET /users or /users.json
  def index
    @users = User.all
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to users_path }
        format.json { render :show, status: :created, location: @user }
        flash[:success] = "Criado com sucesso!"
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
        flash[:error] = "Não foi possível criar o registro!"
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
      params[:user].extract!(:password, :password_confirmation)
    end
    if params[:user][:origem] == 'user'
      respond_to do |format|
        if @user.update(user_params)
          format.html { redirect_to users_path }
          format.json { render :show, status: :ok, location: @user }
          flash[:success] = "Atualizado com sucesso!"
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @user.errors, status: :unprocessable_entity }
          flash[:error] = "Não foi possível atualizar o registro!"
        end
      end
    else
      respond_to do |format|
        if @user.update(user_params)
          format.html { redirect_to profiles_path }
          flash[:success] = "Atualizado com sucesso!"

        else
          format.html { render :index, status: :unprocessable_entity }
          format.json { render json: @user.errors, status: :unprocessable_entity }
          flash[:error] = "Não foi possível atualizar o registro!"
        end
      end
    end

  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
    @user.origem = :user
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:admin, :email, :name, :image, :password, :password_confirmation, :origem)
  end

  def add_breadcrumb_menu
    add_breadcrumb "Cadastros Básicos", '#'
    add_breadcrumb "Usuários", users_path
  end

  def permission
    unless can? :manage, :all
      flash[:error] = "Vocé não tem permissão!"
      redirect_to root_path
    end
  end
end
