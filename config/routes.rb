Rails.application.routes.draw do
  root "pages#home"  # <- pakai # bukan /

  get "up" => "rails/health#show", as: :rails_health_check

  post '/messages', to: 'messages#create'
end
