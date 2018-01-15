import React from 'react'
import axios from 'axios'
import Chart from './Chart'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      labels: [],
      values: [],
      loading: true
    }
  }

  fetchDeals () {
    axios.get('api/deals')
      .then(response => {
        this.setState({
          labels: response.data.labels.map((label) => { return label }),
          values: response.data.values.map((value) => { return value.toFixed(2) }),
          loading: false
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidMount () {
    this.fetchDeals()
  }

  componentWillReceiveProps () {
    this.fetchDeals()
  }

  render () {
    let styles= {
      chartStyle: {
        width: '55%',
        margin: '0 auto'
      }
    }

    return (
      <div>
        <div style={styles.chartStyle}>
          <header>
            <h3>Deals Pipeline</h3>
            <p>Total $ value of deals by stage</p>
          </header>
          { this.state.loading == false ? (
            <Chart labels={this.state.labels} values={this.state.values} />
          ) : (false)}

        </div>
      </div>
    )
  }
}

export default App