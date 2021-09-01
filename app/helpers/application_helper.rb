module ApplicationHelper

  def link_to_editar(path, options = {})
    link_to path,
            class: "btn btn-#{options[:btn_color] || 'warning'} btn-sm #{options[:class] || 'btn-icon'}",
            title: options[:label] || "Alterar",
            remote: options[:remote] || false,
            target: options[:target] || '_self',
            label: options[:label] do
      "#{ content_tag :span, class: "fas fa-#{options[:fa_icon] || 'pen'}" do
        ''
      end} #{options[:label] if options.present? && options[:label]}".html_safe
    end
  end

  def link_to_visualizar(path, options = {})
    if can? :read, :all
      link_to path,
              class: "btn btn-info btn-sm  #{options[:class] || 'btn-icon'}",
              title: options[:title] || "Visualizar",
              remote: options[:remote] || false,
              target: options[:target] || '_self',
              style: "color: #FFF; float: none;" do
        "#{ content_tag :i, class: options[:class_icon] || 'fas fa-search' do
          ''
        end} #{options[:label] if options.present? && options[:label]}".html_safe
      end
    end
  end

  def link_to_excluir(path, options = {})
    if can? :destroy, :all
      link_to path,
              method: options[:method] || "delete",
              label: options[:label],
              class: "btn btn-danger btn-sm #{options[:class] || 'btn-icon'}",
              remote: options[:remote] || false,
              title: options[:title] || "Excluir",
              data: { confirm: options[:confirm] || 'Tem certeza?' } do
        "#{ content_tag :i, class: 'fas fa-trash' do
          ''
        end} #{options[:label] if options.present? && options[:label]}".html_safe
      end
    end
  end

  def link_to_novo(path, options = {})
    link_to path,
            label: options[:label] || "Novo",
            class: "btn btn-icon icon-left btn-primary btn-sm #{options[:class]}",
            remote: options[:remote] || false,
            style: "float: right",
            title: options[:title] || "Novo" do
      "#{ content_tag :i, class: 'fas fa-plus' do
        ''
      end} #{options[:label] if options.present? && options[:label]}".html_safe
    end
  end

  def link_to_menu(path, icon, options = {})
    link_to path,
            label: options[:label],
            class: "nav-link #{options[:class]}",
            remote: options[:remote] || false,
            title: options[:label] do
      "#{ content_tag :i, class: "fas #{icon}" do
        ''
      end}
      #{ content_tag :span do
        "#{options[:label] if options.present? && options[:label]}"
      end}".html_safe
    end
  end

  def link_to_button(path, icon, options = {})
    link_to path,
            label: options[:label],
            class: options[:class],
            remote: options[:remote] || false,
            title: options[:label] do
      "#{ content_tag :i, class: "fas #{icon}" do
        ''
      end} #{options[:label] if options.present? && options[:label]}".html_safe
    end
  end

  def user_profile_img(object, options = {})
    if object.image.attached?
      image_tag object.image, id: options[:id], class: options[:class], data: options[:data], width: options[:width]
    else
      image_tag 'avatar-1.jpg', id: options[:id], class: options[:class], width: options[:width]
    end
  end

  def img_or_default(object, options = {})
    if object.image.attached?
      image_tag object.image, id: options[:id], class: options[:class], data: options[:data], width: options[:width]
    else
      image_tag 'image_default.png', id: options[:id], class: options[:class], width: options[:width]
    end
  end

  def timezone(date)
    return '' if date.blank?
    date.strftime("%d/%m/%Y %H:%M:%S")
  end

  def progress(value, total, options = {})
    percent = Util.percent(value, total).round(2).to_s
    html = <<-HTML
      <div class="progress mb-3" data-height="#{options[:height] || 10}" style="height: #{options[:height] || 10}px; " data-toggle="tooltip" 
           data-placement="top" title='' data-original-title="#{options[:label_progress] || 'Pontuação:'} #{value} / #{total.to_i}">
        <div class="progress-bar bg-#{options[:color] || 'warning'}" role="progressbar" data-width="#{percent}%" aria-valuenow="#{percent}"
             aria-valuemin="0" aria-valuemax="100" style="width: #{percent}%;">#{options[:show_percentage] ? "#{percent}%" : ''}</div>
      </div>
    HTML
    html.html_safe
  end

end