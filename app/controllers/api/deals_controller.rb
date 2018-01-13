class Api::DealsController < ApplicationController
  def index

    RestClient.get "https://api.pipelinedeals.com/api/v3/deals.json?api_key=#{ENV['DEALS_API_KEY']}" do |response|
      json = JSON.parse(response)
      @entries = json['entries'].sort { |a,b| a['deal_stage']['percent'] <=> b['deal_stage']['percent'] }
      @labels = @entries.uniq { |entry| entry['deal_stage']['name'] }

      @values = []
      @labels.each do |label|
        sum = 0
        @entries.select {|entry| entry['deal_stage']['name'] == label['deal_stage']['name'] }
          .each { |entry| sum += entry['value'].to_f }
        @values.push(sum)
      end

      puts @values

    end

  end
end
