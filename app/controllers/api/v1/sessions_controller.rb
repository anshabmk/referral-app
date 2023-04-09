class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery with: :null_session

  private

  def respond_with(resource, _opts = {})
    render json: { message: "Logged in sucessfully.", data: resource }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: { message: "Logged out successfully." }, status: :ok
    else
      render json: { message: "Couldn't find an active session." }, status: :unauthorized
    end
  end
end
