require "application_system_test_case"

class UserRewardsTest < ApplicationSystemTestCase
  setup do
    @user_reward = user_rewards(:one)
  end

  test "visiting the index" do
    visit user_rewards_url
    assert_selector "h1", text: "User Rewards"
  end

  test "creating a User reward" do
    visit user_rewards_url
    click_on "New User Reward"

    click_on "Create User reward"

    assert_text "User reward was successfully created"
    click_on "Back"
  end

  test "updating a User reward" do
    visit user_rewards_url
    click_on "Edit", match: :first

    click_on "Update User reward"

    assert_text "User reward was successfully updated"
    click_on "Back"
  end

  test "destroying a User reward" do
    visit user_rewards_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User reward was successfully destroyed"
  end
end
