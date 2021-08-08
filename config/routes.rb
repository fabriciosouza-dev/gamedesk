Rails.application.routes.draw do
  devise_for :users

  resources :yields
  resources :users, path: :usuarios
  resources :achievements, path: :cadastro_conquistas
  resources :user_achievements, path: :conquistas, only: [:index] do
    get :open_achievements, on: :collection
  end
  resources :profiles, path: :perfil, except: [:destroy, :create, :new]
  resources :dashboards, path: :principal, only: [:index] do
    get :popula_tabela_service, on: :collection
  end

  root to: 'dashboards#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
