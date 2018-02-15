# This will load the autorun of minitest that will detect tests from
# methods beginning with `test_` and will run automatically
require 'minitest/autorun'
require './vector.rb'

# All testing features including running the tests
# will come from the inherited class MiniTest::Test
class TestVector < MiniTest::Test

  def test_one_plus_one
    # GIVEN: Setup initial state
    a = 1
    b = 1

    # WHEN: Run a behaviour
    result = a + b

    # THEN: Check that new state is what we expect

    # Testing libraries like MiniTest provide assertions
    # which are methods to compare values. THis is a great
    # way to compare the new state against the expected state.

    # assert_equal will compare to values using `==`
    assert_equal(2, result)
  end

  def test_has_attr_reader_for_x
    # GIVEN: A new vector
    v = Vector.new(2,3)

    # WHEN: ...

    # THEN:
    assert_equal(2, v.x)
  end

  def test_has_attr_writer_for_x
    # GIVEN: A new vector
    v = Vector.new(2,3)

    # WHEN: x is changed with attr_writer
    v.x = 8

    # THEN:
    assert_equal(8, v.x)
  end

  def test_returns_the_correct_length
    # GIVEN: A new Vector
    v = Vector.new(3, 4)

    # WHEN: length is calculated
    length = v.length

    # THEN:
    assert_equal(5, length)
  end
end
