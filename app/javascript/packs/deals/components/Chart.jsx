import React from 'react'
import { Bar } from 'react-chartjs-2'

class Chart extends React.Component {
  constructor (props) {
    super(props)

    this.options = {
      legend: {
        display: false
      },
      tooltips: {
        mode: 'label',
        label: 'mylabel',
        callbacks: {
          label: function(tooltipItem, data) {
            return '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function (label, index, labels) {
              return '$' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            beginAtZero: true,
            fontSize: 10,
          },
          gridLines: {
            display: true
          }
        }],
      }
    }
  }

  render () {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: 'Deals Pipeline',
          backgroundColor: 'rgba(0,150,255,0.2)',
          borderColor: 'rgba(0,150,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0,150,255,0.4)',
          hoverBorderColor: 'rgba(0,150,255,1)',
          data: this.props.values
        }
      ]
    }

    return (
      <Bar data={data} options={this.options} />
    )
  }
}

export default Chart