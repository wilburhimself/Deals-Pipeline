import React from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

class App extends React.Component {
    constructor () {
        super()
        this.state = {
            labels: [],
            values: []
        }
    }

    fetchDeals () {
        axios.get('api/deals')
            .then(response => {
                console.log(response)
                this.setState({
                    labels: response.data.labels.map((label) => { return label.name }),
                    values: response.data.values.map((value) => { return value.value.toFixed(2) })
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
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Deals Pipeline',
                    // backgroundColor: 'rgba(255,99,132,0.2)',
                    // borderColor: 'rgba(255,99,132,1)',
                    // borderWidth: 1,
                    // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    // hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.values
                }

            ]
        }

        const options = {
            legend: {
                display: false
            },
            tooltips: {
                mode: 'label',
                label: 'mylabel',
                callbacks: {
                    label: function(tooltipItem, data) {
                        return '$' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
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
        return (
            <div>
                <Bar data={data} options={options} />
            </div>
        )
    }
}

export default App