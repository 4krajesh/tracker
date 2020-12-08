import React from "react";
import Chart from "chart.js";

import { Panel } from "rsuite";

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      //borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const options = {
  title: {
    display: true,
    text: "Average Rainfall per month",
    fontSize: 20,
    fontFamily: "Quicksand",
  },
  legend: {
    display: true,
    position: "right",
    fontFamily: "Quicksand",
  },
};

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    console.log(state, options);
    Chart.defaults.global.defaultFontFamily = "Quicksand";
    var color = Chart.helpers.color;
    this.myChart = new Chart(this.chartRef.current, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Rainfall",
            backgroundColor: color("red").alpha(0.3).rgbString(),
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Average Rainfall per month",
          fontSize: 20,
          fontFamily: "Quicksand",
        },
        legend: {
          display: true,
          position: "right",
          fontFamily: "Quicksand",
        },
      },
    });
  }

  render() {
    return (
      <div>
        <Panel
          header="Chart"
          shaded
          style={{ margin: "10px", borderRadius: "16px" }}
        >
          <canvas ref={this.chartRef} />
        </Panel>
      </div>
    );
  }
}
