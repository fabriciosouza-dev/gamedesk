require 'test_helper'

class UserRewardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_reward = user_rewards(:one)
  end

  test "should get index" do
    get user_rewards_url
    assert_response :success
  end

  test "should get new" do
    get new_user_reward_url
    assert_response :success
  end

  test "should create user_reward" do
    assert_difference('UserReward.count') do
      post user_rewards_url, params: { user_reward: {  } }
    end

    assert_redirected_to user_reward_url(UserReward.last)
  end

  test "should show user_reward" do
    get user_reward_url(@user_reward)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_reward_url(@user_reward)
    assert_response :success
  end

  test "should update user_reward" do
    patch user_reward_url(@user_reward), params: { user_reward: {  } }
    assert_redirected_to user_reward_url(@user_reward)
  end

  test "should destroy user_reward" do
    assert_difference('UserReward.count', -1) do
      delete user_reward_url(@user_reward)
    end

    assert_redirected_to user_rewards_url
  end
end
