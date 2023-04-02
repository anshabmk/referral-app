class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :password_confirmation, presence: true
  has_many :referrals
end
