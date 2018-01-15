import React from 'react'
import ReactDOM from 'react-dom'
import Chart from '../../app/javascript/packs/deals/components/Chart'

describe('App component renders a Chart with deal pipeline', () => {
  it ('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Chart/>, div)
  })
})