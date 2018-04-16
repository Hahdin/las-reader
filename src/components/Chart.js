import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/common.css'
import ChartJs from 'chart.js'

class Chart extends Component {
  constructor(props) {
    console.log('chart constructor')
    super(props);
    this.state = {
      title: '',
      info: {
        file: [],
        readingFile: false
      },
      chart: null,
    }
  }

  componentDidMount() {
    this.initChart()
  }

  pushData(label, data) {
    return new Promise((resolve, reject) => {
      this.state.chart.data.labels.push(label)
      this.state.chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data)
      })
      resolve(true)
    })
  }

  popData() {
    return new Promise((resolve, reject) => {
      this.state.chart.data.labels.forEach(label => {
        this.state.chart.data.labels.pop()
      })
      this.state.chart.data.datasets.forEach((dataset) => {
        dataset.data.forEach((data, i) => {
          dataset.data.pop()
          if (i === dataset.data.length - 1) {
            resolve(true)
          }
        })
      })
    })
  }

  initChart() {
    let labels = []
    let op = 1.0
    let lineColor = ['rgba(0, 0, 0, ' + op + ')']

    let body = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Curve Data',
          data: null,
          fill: false,
          borderColor: lineColor,
          backgroundColor: ['rgba(255,255,255, 0.3)'],
          borderWidth: 0.5,
          pointStyle: 'circle',
          pointRadius: 1
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
    let ctx = null
    if (this.state.chart) {
      this.state.chart.destroy()
      this.setState({ chart: null })
    }

    if (document.getElementById("myChart")) {
      console.log('found chart in page')
      ctx = document.getElementById("myChart").getContext("2d")
      this.state.chart = new ChartJs(ctx, body)
      console.log('\t new chart!!')
    }
  }

  componentWillMount() {
  }

  render() {
    let curveIndex = -1
    if (this.props.info.file.CURVE_INFORMATION) {
      let curves = Object.keys(this.props.info.file.CURVE_INFORMATION)
      curves.forEach((curve, i) => {
        if (curve === this.props.info.file.chartCurve)
          curveIndex = i
      })
    }

    let style = {
      height: '600px',
      width: '100%'
    }
    if (this.props.info.readingFile && this.state.chart) {
      this.popData(this.state.chart).then(pr => {
        console.log('chart cleared of data')
        this.state.chart.update()
      })
    }
    else if (this.state.chart && curveIndex >= 1) {
      this.state.chart.data.datasets.forEach(set => {
        if (set.label === 'Curve Data') {
          set.data = []
        }
      })
      this.state.chart.data.labels = []
      //copy the data
      let data = this.props.info.file.ASCII.data.slice(0)
      //get our data
      let ourLabels = data.map(line => {
        return line[0]
      })
      let ourPoints = data.map(line => {
        return parseFloat(line[curveIndex]) === -999.25 ? null : parseFloat(line[curveIndex])
      })
      if (data.length > 0) {
        if (this.props.title !== this.state.title) {
          console.log('title change')
          this.state.title = this.props.title
          this.state.chart.reset()
        }
        ourLabels.map(label => {
          this.state.chart.data.labels.push(parseFloat(label))
        })
        this.state.chart.data.datasets.forEach(set => {
          if (set.label === 'Curve Data') {
            ourPoints.map(point => {
              set.data.push(point)
            })
            this.state.chart.update()
          }
        })
      }
    }
    return (
      <div>
        <div id="chartContainer" style={style}>
          <canvas id="myChart" style={style}></canvas>
          {this.props.test()}
        </div>
      </div >
    )
  }
}

Chart.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  test: PropTypes.func.isRequired
}
export default Chart
