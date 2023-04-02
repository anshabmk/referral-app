class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.string :email
      t.references :user, null: false, foreign_key: true
      t.string :referral_token
      t.boolean :pending, default: true

      t.timestamps
    end
  end
end
