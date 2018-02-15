require 'minitest/autorun'
require './rectangle.rb'

class TestRectangle < MiniTest::Test
  def test_area_with_4_by_2
    # GIVEN: Initial state
    r = Rectangle.new(4, 2)

    # WHEN: ...
    area = r.area

    # THEN:
    assert_equal(8, area)
  end

  def test_area_with_2_by_2
    assert_equal(4, Rectangle.new(2, 2).area)
  end

  def test_area_with_1_by_1
    assert_equal(1, Rectangle.new(1, 1).area)
  end

  def test_area_with_10_by_20
    assert_equal(200, Rectangle.new(10, 20).area)
  end

  def test_perimeter_with_4_by_4
    assert_equal(
      16,
      Rectangle.new(4, 4).perimeter
    )
  end

  def test_perimeter_with_1_by_4
    assert_equal(
      10,
      Rectangle.new(1, 4).perimeter
    )
  end

  def test_is_square_with_square
    assert_equal(
      true,
      Rectangle.new(2, 2).is_square?
    )
  end

  def test_is_square_without_square
    assert_equal(
      false,
      Rectangle.new(2, 5).is_square?
    )
  end
end
