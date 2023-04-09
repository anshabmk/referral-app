class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  protect_from_forgery with: :null_session

  def create
    user = User.new(user_params)

    if user.save
      handle_referral(user) if params[:referral_token].present?
      render json: { user: user }
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def handle_referral(user)
    pending_referral = Referral.find_by(
      email: user.email,
      referral_token: params[:referral_token],
      pending: true
    )

    return if pending_referral.blank?

    user.update!(referrer_id: pending_referral.user_id)
    pending_referral.update!(pending: false)
  end
end
