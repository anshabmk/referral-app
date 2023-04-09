class AddReferrerToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :referrer, foreign_key: { to_table: :users }, null: true
  end
end
