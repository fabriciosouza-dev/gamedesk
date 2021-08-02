class User < ApplicationRecord
  include UserConcern

  def self.default_password
    "G@medesk2021"
  end
end
