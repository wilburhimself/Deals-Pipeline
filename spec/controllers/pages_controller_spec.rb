require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  describe '#home' do
    it 'renders successfully' do
      expect(get('home')).to be_success
    end
  end

end
