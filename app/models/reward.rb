class Reward < ApplicationRecord
  self.table_name = "gamedesk.rewards"

  has_many :type_associations, class_name: "TypeAssociation", :as => :origem
  accepts_nested_attributes_for :type_associations, allow_destroy: true

end
