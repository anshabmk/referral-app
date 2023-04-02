class ReferralMailer < ApplicationMailer
  def referral_email(referral)
    @referral = referral
    mail(to: @referral.email, subject: "Referral to join my app")
  end
end
