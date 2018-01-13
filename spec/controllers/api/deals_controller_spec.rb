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
end
