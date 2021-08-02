require 'test_helper'

class YieldsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @yield = yields(:one)
  end

  test "should get index" do
    get yields_url
    assert_response :success
  end

  test "should get new" do
    get new_yield_url
    assert_response :success
  end

  test "should create yield" do
    assert_difference('Yield.count') do
      post yields_url, params: { yield: {  } }
    end

    assert_redirected_to yield_url(Yield.last)
  end

  test "should show yield" do
    get yield_url(@yield)
    assert_response :success
  end

  test "should get edit" do
    get edit_yield_url(@yield)
    assert_response :success
  end

  test "should update yield" do
    patch yield_url(@yield), params: { yield: {  } }
    assert_redirected_to yield_url(@yield)
  end

  test "should destroy yield" do
    assert_difference('Yield.count', -1) do
      delete yield_url(@yield)
    end

    assert_redirected_to yields_url
  end
end
