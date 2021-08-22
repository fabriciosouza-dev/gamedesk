require 'test_helper'

class TypeRulesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @type_rule = type_rules(:one)
  end

  test "should get index" do
    get type_rules_url
    assert_response :success
  end

  test "should get new" do
    get new_type_rule_url
    assert_response :success
  end

  test "should create type_rule" do
    assert_difference('TypeRule.count') do
      post type_rules_url, params: { type_rule: {  } }
    end

    assert_redirected_to type_rule_url(TypeRule.last)
  end

  test "should show type_rule" do
    get type_rule_url(@type_rule)
    assert_response :success
  end

  test "should get edit" do
    get edit_type_rule_url(@type_rule)
    assert_response :success
  end

  test "should update type_rule" do
    patch type_rule_url(@type_rule), params: { type_rule: {  } }
    assert_redirected_to type_rule_url(@type_rule)
  end

  test "should destroy type_rule" do
    assert_difference('TypeRule.count', -1) do
      delete type_rule_url(@type_rule)
    end

    assert_redirected_to type_rules_url
  end
end
