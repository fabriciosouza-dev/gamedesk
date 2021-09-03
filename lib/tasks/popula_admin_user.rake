namespace :popula_admin_user do
  # rake popula_admin_user:execute
  desc "a new task to be executed"
  task execute: :environment do
    User.create(name: 'Fabricio', email: 'fabricioeliasdesouza@gmail.com',
                admin: true, password: 'admin123', password_confirmation: 'admin123')
  end
end
