# frozen_string_literal: true

require "active_support/concern"

module UserConcern
  extend ActiveSupport::Concern

  included do
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :validatable
    self.table_name = "gamedesk.users"

    attr_accessor :origem

    has_one_attached :image

    has_many :tickets, class_name: "Ticket", foreign_key: :assignee_id, primary_key: :assignee_id

    has_one :yield, class_name: "Yield", foreign_key: :assignee_id, primary_key: :assignee_id
  end
end
