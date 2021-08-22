class TypeAssociation < ApplicationRecord
  self.table_name = "gamedesk.type_associations"
  belongs_to :origem, polymorphic: true
end
