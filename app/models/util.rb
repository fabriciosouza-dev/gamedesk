class Util
  def self.calcula_xp(level)
    return 0 unless level.present?
    (level / 0.07) ** 2
  end

  def self.percent(value, total)
    return 0 if value.to_i == 0 || total.to_i == 0
    (value * 100) / total
  end

  def self.translate_enum_name(class_name, enum_name, enum_value)
    return nil unless enum_value
    I18n.t("activerecord.attributes.#{class_name.to_s.underscore}.#{enum_name}.#{enum_value}")
  end

  def self.format_date_br(date)
    date.strftime("%d/%m/%Y %H:%M")
  end

  def self.colors
    ['#EB870E', '#464646', '#7678ED', '#08A045', '#DB162F', '#D80CE8',
     '#5F00F5', '#A8A200', '#A83208', '#FFBF00',
     '#DE3163', '#9FE2BF', '#40E0D0', '#6495ED', '#CCCCFF',]
  end
end
