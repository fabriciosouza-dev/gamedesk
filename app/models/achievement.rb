class Achievement < ApplicationRecord
  self.table_name = "gamedesk.achievements"

  has_one_attached :image

  has_many :user_achievements, class_name: "UserAchievement", foreign_key: :achievement_id, dependent: :destroy

  before_save :valida_foto

  private

  def valida_foto
    unless self.image.attached?
      self.errors.add(:image, " deve conter uma imagem válida")
    end
  end
end
