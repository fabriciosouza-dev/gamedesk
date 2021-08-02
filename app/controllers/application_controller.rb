class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :add_breadcrumb_inicio
  before_action :set_session_variables

  def add_breadcrumb_inicio
    add_breadcrumb "Início", root_path
  end

  def set_session_variables
    # session[:user] = current_user.
  end

end
