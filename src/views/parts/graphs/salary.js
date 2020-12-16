import React from "react";
import Chart from "chart.js";

import { Panel, Button, RadioGroup, Radio, Notification } from "rsuite";
import { Grid, Row, Col } from "rsuite";

function randomColor() {
  var color = Chart.helpers.color;
  return color("#" + Math.floor(Math.random() * 16777215).toString(16))
    .alpha(0.3)
    .rgbString();
}

function getColor(c) {
  var color = Chart.helpers.color;
  return color(c.toString(16)).alpha(0.3).rgbString();
}

export default class SalaryChart extends React.Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      year: d.getFullYear().toString(),
      years: [],
      labels: [],
      datasets: [],
    };
    this.salaryChartRef = React.createRef();
    this.salaryYearChartRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  drawSalaryChart() {
    this.mySalaryChart = new Chart(this.salaryChartRef.current, {
      type: "bar",
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        title: {
          display: false,
          text: "Salary Per Month",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "top",
        },
      },
    });
    this.mySalaryDoughnut = new Chart(this.salaryYearChartRef.current, {
      type: "doughnut",
      data: { labels: ["Gross", "Net", "Deductions"], datasets: [{}] },
      options: {
        responsive: true,
        title: {
          display: false,
          text: "Salary Per Year",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "left",
        },
      },
    });
  }

  componentDidUpdate() {
    const { details, year } = this.state;

    if (details) {
      this.mySalaryDoughnut.data.datasets = this.getDoughnutDataSets(details);
      this.mySalaryChart.data.labels = this.state.details[year]["labels"];
      this.mySalaryChart.data.datasets = this.getChartDataSets(details);
      this.mySalaryChart.update();
      this.mySalaryDoughnut.update();
    }
  }

  getDoughnutDataSets(data) {
    const { year } = this.state;
    const bgc = [getColor("blue"), getColor("green"), getColor("red")];
    if (data) {
      return [
        {
          data: [data[year]["total"]["gross"], 0, 0],
          backgroundColor: bgc,
          label: "Gross",
        },

        {
          data: [
            0,
            data[year]["total"]["net"],
            data[year]["total"]["deductions"],
          ],
          backgroundColor: bgc,
          label: ["Net + Deductions"],
        },
      ];
    }
  }
  getChartDataSets(data) {
    const { year } = this.state;
    if (data) {
      return [
        {
          label: "Gross Pay",
          backgroundColor: getColor("blue"),
          data: data[year]["data"]["gross"],
        },
        {
          label: "Net Pay",
          backgroundColor: getColor("green"),
          data: data[year]["data"]["net"],
        },
        {
          label: "Deductions",
          backgroundColor: getColor("red"),
          data: data[year]["data"]["deductions"],
        },
      ];
    }
  }
  componentDidMount() {
    Chart.defaults.global.defaultFontFamily = "Quicksand";
    fetch("http://192.0.0.0:3000/salary")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            details: result,
            years: Object.keys(result),
            labels: result[this.state.year]["labels"],
            datasets: this.getChartDataSets(result),
            doughnutsets: this.getDoughnutDataSets(result),
          });

          const { doughnutsets, labels, datasets } = this.state;
          this.mySalaryDoughnut.data.datasets = doughnutsets;
          this.mySalaryChart.data.labels = labels;
          this.mySalaryChart.data.datasets = datasets;
          this.mySalaryChart.update();
          this.mySalaryDoughnut.update();
        },
        (error) => {
          Notification.error({
            title: "Error",
            duration: 0,
            description: (
              <>
                <p>Unable to retrive salary data.</p>
                <p>Please verify if your server API is working.</p>
              </>
            ),
          });
          this.setState({
            error,
          });
        }
      );
    this.drawSalaryChart();
  }

  handleChange(value) {
    this.setState({ year: value });
  }

  render() {
    const { year } = this.state;
    const years = this.state.years.map((year, index) => (
      <Radio value={year} key={index}>
        {year}
      </Radio>
    ));
    const styles = {
      radioGroup: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
      },
      panel: { margin: "10px", borderRadius: "16px", padding: "10px" },
    };
    return (
      <div>
        <Panel shaded style={styles.panel}>
          <Grid fluid>
            <Row className="show-grid">
              <RadioGroup
                inline
                name="radioList"
                appearance="picker"
                defaultValue={year}
                onChange={this.handleChange}
                style={styles.radioGroup}
              >
                {years}
              </RadioGroup>
            </Row>
            <Row className="show-grid">
              <Col xs={24} sm={24} md={14}>
                <h3>Salary per month - {year}</h3>

                <canvas ref={this.salaryChartRef} />
              </Col>
              <Col xs={24} sm={24} md={10}>
                <h3>Salary per year - {year}</h3>
                <canvas
                  ref={this.salaryYearChartRef}
                  style={{ margin: "50px 0" }}
                />
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}
