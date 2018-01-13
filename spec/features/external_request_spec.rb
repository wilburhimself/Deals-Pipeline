require 'rails_helper'

feature 'External Request' do
  it 'queries Deals from pipelineDeals API' do
    uri = URI('https://api.pipelinedeals.com/api/v3/deals.json')
    response = Net::HTTP.get(uri)

    expect(response).to be_an_instance_of(String)
  end
end