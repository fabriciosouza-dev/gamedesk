module DashboardHelper
  def podium(placing, options = {})
    case placing
    when 1
      image_tag "trophy_gold.png"
    when 2
      image_tag "trophy_silver.png"
    when 3
      image_tag "trophy_bronze.png"
    else
      placing
    end
  end

end

