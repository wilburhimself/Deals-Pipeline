json.labels @labels.each do |label|
  json.name label['deal_stage']['name']
end


json.values @values.each do |value|
  json.value value
end