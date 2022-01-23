Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  authenticated :user do    
    root "pages#my_tasks", as: :authenticated_root  
  end
  root 'pages#home'

  namespace :api, defaults: { format: :json } do    
    namespace :v1 do      
      resources :tasks, only: [:index, :show, :create, :update, :destroy]    
    end  
  end
end
