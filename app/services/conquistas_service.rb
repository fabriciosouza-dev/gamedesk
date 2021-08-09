class ConquistasService
  def initialize(params)
    @assignee_id = params[:assignee_id]
  end

  def execute
    object_yield = Yield.find_by(assignee_id: @assignee_id)
    Achievement.where(status: 1).each do |achievement|
      regra = achievement.regra
      begin
        if eval(regra)
          UserAchievement.find_or_create_by(assignee_id: @new_ticket&.assignee_id.to_i, achievement_id: achievement.id)
        end
      rescue => error
        nil
      end
    end
  end

end