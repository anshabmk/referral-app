class Referral < ApplicationRecord
  belongs_to :user
  before_validation :set_referral_token

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :referral_token, presence: true, uniqueness: { case_sensitive: false }

  private

  def set_referral_token
    self.referral_token = SecureRandom.hex
  end
end
