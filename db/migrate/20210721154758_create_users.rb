class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    unless table_exists? "gamedesk.users"
      create_table "gamedesk.users" do |t|
        t.boolean :admin
        t.string :name
        t.string :phone
        t.numeric :assignee_id
        t.integer :status
        t.timestamps
      end
    end
  end
end
