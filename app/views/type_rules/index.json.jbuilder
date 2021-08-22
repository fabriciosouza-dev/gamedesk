json.set! :data do
  json.array! @type_rules do |type_rule|
    json.partial! 'type_rules/type_rule', type_rule: type_rule
    json.url  "
              #{link_to 'Show', type_rule }
              #{link_to 'Edit', edit_type_rule_path(type_rule)}
              #{link_to 'Destroy', type_rule, method: :delete, data: { confirm: 'Are you sure?' }}
              "
  end
end