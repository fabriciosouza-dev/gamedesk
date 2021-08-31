class Util
  def self.calcula_xp(level)
    (level / 0.07) ** 2
  end

  def self.percent(value, total)
    return 0 if value.nil? || total.nil?
    (value * 100) / total
  end

  def self.translate_enum_name(class_name, enum_name, enum_value)
    return nil unless enum_value
    I18n.t("activerecord.attributes.#{class_name.to_s.underscore}.#{enum_name}.#{enum_value}")
  end

  def self.format_date_br(date)
    date.strftime("%d/%m/%Y %H:%M")
  end
end
