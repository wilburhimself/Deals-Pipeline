class Api::DealsController < ApplicationController
  def index
    entries = fetch_entries
    labels = get_labels(entries)
    values = get_values(entries)
    render json: present_deals_chart_data(labels, values).to_json
  end

  private
  def fetch_entries
    response = RestClient.get "https://api.pipelinedeals.com/api/v3/deals.json?api_key=#{ENV['DEALS_API_KEY']}"
    json = JSON.parse(response)
    json['entries'].sort { |a,b| a['deal_stage']['percent'] <=> b['deal_stage']['percent'] }
  end

  def get_labels(entries)
    entries.uniq { |entry| entry['deal_stage']['name'] }
  end

  def get_values(entries)
    get_labels(entries).collect do |label|
      sum = 0
      entries.select {|entry| entry['deal_stage']['name'] == label['deal_stage']['name'] }
          .each { |entry| sum += entry['value'].to_f }
      sum
    end
  end

  def present_deals_chart_data(labels, values)
    {
      labels: labels.collect {|label| label['deal_stage']['name'] },
      values: values.collect {|value| value }
    }
  end
end
