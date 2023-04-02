Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: "api/v1/sessions", registrations: "api/v1/registrations" }

  root "home#index"
  get "/*path" => "home#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
end
