class Rectangle
  def initialize(w, h)
    @w = w
    @h = h
  end

  def area
    @w * @h
  end

  def perimeter
    2 * (@w + @h)
  end

  def is_square?
    @w == @h
  end
end
