class UserAchievementsController < ApplicationController

  # GET /achievements or /achievements.json
  def index
    @user_achievements = UserAchievement.where(assignee_id: current_user.assignee_id)
    @achievements = Achievement.where(status: 1)

  end

  def open_achievements
    @achievement = Achievement.find(params[:id]) if params[:id].present?
    respond_to do |format|
      format.html
      format.js
    end
  end

end
