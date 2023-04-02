class Api::V1::ReferralsController < ApplicationController
  respond_to :json
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def index
    render json: { referrals: current_user.referrals }
  end

  def create
    referral = current_user.referrals.build(referral_params)

    if referral.save
      ReferralMailer.referral_email(referral).deliver_later
      render json: { success: true, message: "Referral email sent to #{referral_params[:email]}." }
    else
      render json: { success: false, errors: referral.errors.full_messages }
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:email)
  end
end
