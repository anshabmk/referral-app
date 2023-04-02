class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery with: :null_session

  def create
    user = User.find_for_database_authentication(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)

      render json: { user: user }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
