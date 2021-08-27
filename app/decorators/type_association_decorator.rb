class TypeAssociationDecorator < ApplicationDecorator
  delegate_all

  def priorities
    html = <<-HTML
    HTML
    if self.priority.present?
      self.priority.split(',').each do |priority|
        html += "<span class='btn btn-outline-primary btn-sm'>#{Util.translate_enum_name(Ticket, :priorities, priority)}</span>"
      end
    end
    html.html_safe
  end
end
