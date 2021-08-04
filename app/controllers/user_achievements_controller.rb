class UserAchievementsController < ApplicationController

  # GET /achievements or /achievements.json
  def index
    @user_achievements = UserAchievement.where(assignee_id: current_user.assignee_id)
  end

end
