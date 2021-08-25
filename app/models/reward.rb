class Reward < ApplicationRecord
  self.table_name = "gamedesk.rewards"

  has_one :type_association, class_name: "TypeAssociation", :as => :origem, dependent: :destroy
  accepts_nested_attributes_for :type_association, allow_destroy: true

end
