class TypeAssociation < ApplicationRecord
  self.table_name = "gamedesk.type_associations"
  belongs_to :origem, polymorphic: true

  before_save :format_priority

  private

  def format_priority
    array = JSON.parse(self.priority)
    if array.reject!(&:empty?).present?
      self.priority = array.join(',')
    else
      self.priority = nil
    end
  end
end
