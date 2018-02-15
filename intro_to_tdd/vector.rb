class Vector
  attr_accessor :x, :y

  # v = Vector.new(2, 3)
  # v.x # returns 2
  # def x
  #   @x
  # end

  # v = Vector.new(2, 3)
  # v.x = 4
  # v.x # returns 4
  # def x=(value)
  #   @x = value
  # end

  def initialize(x, y)
    @x = x
    @y = y
  end

  def length
    Math.sqrt(x**2 + y**2)
  end
end
