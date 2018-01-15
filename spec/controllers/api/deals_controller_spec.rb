require 'rails_helper'

RSpec.describe Api::DealsController, type: :controller do

  let(:json) { JSON.parse(response.body) }

  describe '#index' do
    before do
      get :index, format: :json
    end

    it 'succeeds' do
      expect(response).to be_success
    end

    it 'sends a list of labels' do
      expect(json['labels'].length).to eq(4)
    end

    it 'sends a list of values' do
      expect(json['values'].length).to eq(4)
    end
  end

  describe 'chart data' do
    before do
      get :index, format: :json
    end

    it 'brings an ordered list of labels' do
      # order is based on deal percentage
      expect(json['labels']).to eq(["Request for Info", "Presentation", "Negotiation", "Won"])
    end

    it 'brings the correct sum of values for each label' do
      expect(json['values']).to eq([100.0, 100.0, 200.0, 100.0])
    end
  end
end
