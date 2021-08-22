require "application_system_test_case"

class TypeRulesTest < ApplicationSystemTestCase
  setup do
    @type_rule = type_rules(:one)
  end

  test "visiting the index" do
    visit type_rules_url
    assert_selector "h1", text: "Type Rules"
  end

  test "creating a Type rule" do
    visit type_rules_url
    click_on "New Type Rule"

    click_on "Create Type rule"

    assert_text "Type rule was successfully created"
    click_on "Back"
  end

  test "updating a Type rule" do
    visit type_rules_url
    click_on "Edit", match: :first

    click_on "Update Type rule"

    assert_text "Type rule was successfully updated"
    click_on "Back"
  end

  test "destroying a Type rule" do
    visit type_rules_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Type rule was successfully destroyed"
  end
end
