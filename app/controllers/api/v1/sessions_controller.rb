class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery with: :null_session

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: "Logged in sucessfully.",
      data: resource
    }, status: :ok
  end
end
