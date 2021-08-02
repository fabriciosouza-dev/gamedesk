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

  def progress(value, total)
    percent = Util.percent(value, total).round(2).to_s
    html = <<-HTML
      <div class="progress mb-3" data-height="10" style="height: 10px; " data-toggle="tooltip" data-placement="top" title='' data-original-title="Pontuação: #{value} / #{total.to_i}">
        <div class="progress-bar bg-warning" role="progressbar" data-width="#{percent}%" aria-valuenow="#{percent}" aria-valuemin="0" aria-valuemax="100" style="width: #{percent}%;"></div>
      </div>
    HTML
    html.html_safe
  end
end

