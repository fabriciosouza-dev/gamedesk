json.set! :data do
  json.array! @user_rewards do |user_reward|
    json.partial! 'user_rewards/user_reward', user_reward: user_reward
    json.url  "
              #{link_to 'Show', user_reward }
              #{link_to 'Edit', edit_user_reward_path(user_reward)}
              #{link_to 'Destroy', user_reward, method: :delete, data: { confirm: 'Are you sure?' }}
              "
  end
end