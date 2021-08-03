# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

Rails.application.config.assets.precompile += %w( style.scss components.scss stisla.js custom.js custom.scss
                                                  icon_new_only.png icon_new_with_name.png avatar-1.jpg
                                                  trophy_gold.png trophy_silver.png trophy_bronze.png )
Rails.application.config.assets.precompile += %w( fa-brands-400.eot fa-brands-400.svg fa-brands-400.ttf fa-brands-400.woff
                                                  fa-brands-400.woff2 fa-regular-400.eot fa-regular-400.svg fa-regular-400.ttf
                                                  fa-regular-400.woff fa-regular-400.woff2 fa-solid-900.eot fa-solid-900.svg
                                                  fa-solid-900.ttf fa-solid-900.woff fa-solid-900.woff2 )
Rails.application.config.assets.precompile += /\.(?:svg|eot|woff|ttf)$/
Rails.application.config.assets.paths << Rails.root.join("lib")
Rails.application.config.assets.paths << Rails.root.join("vendor")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
