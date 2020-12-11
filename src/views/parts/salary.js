import React from "react";
import Chart from "chart.js";

import { Panel, Button, RadioGroup, Radio } from "rsuite";
import { Grid, Row, Col } from 'rsuite';


function randomColor() { 
	var color = Chart.helpers.color;
	return color( "#" + Math.floor(Math.random()*16777215).toString(16)).alpha(0.3).rgbString(); 
}

function getColor(c) {
	var color = Chart.helpers.color;
        return color(c.toString(16)).alpha(0.3).rgbString();
}

function randomScalingFactor() {
	return Math.floor(Math.random() * 100)
}

export default class SalaryChart extends React.Component {
  constructor(props) {
    super(props);
	  var d = new Date();
	  this.state = { year: d.getFullYear().toString(), years: [], labels: [], datasets: []}
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
            mode: 'index',
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
   type: 'doughnut',
   data: { labels: ['Gross','Net','Deductions'],
   datasets: [{}]},
	         options: {
      responsive: true,
        title: {
          display: false,
          text: "Salary Per Year",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
      },
   }); 
  }


 componentDidUpdate() {
    this.mySalaryDoughnut.data.datasets = this.getDoughnutDataSets(this.state.details);
    this.mySalaryChart.data.labels = this.state.details[this.state.year]['labels'];
    this.mySalaryChart.data.datasets = this.getChartDataSets(this.state.details);
    this.mySalaryChart.update();
    this.mySalaryDoughnut.update();
  }

  getDoughnutDataSets(data) {
	  const { year } = this.state;
	  return [{
                                        data: [
                                                data[year]['total']['gross'],
                                                0,
                                                0
                                        ],
                                        backgroundColor: [getColor('blue'), getColor('green'), getColor('red')],
                                        label: 'Gross'},

                                {
                                        data: [
                                                0,
                                                data[year]['total']['net'],
                                                data[year]['total']['deductions'],
                                        ],
                                        backgroundColor: [
                                                getColor('blue'),
                                                getColor('green'),
                                                getColor('red'),
                                        ],
                                        label: ['Net + Deductions']
                                }]
  }
  getChartDataSets(data) {
	return [{               label: 'Gross Pay',
                                backgroundColor: getColor('blue'),
                                data: data[this.state.year]['data']['gross']
                        }, {    
                                label: 'Net Pay',
                                backgroundColor: getColor('green'),
                                data: data[this.state.year]['data']['net']
                        }, {    
                                label: 'Deductions',
                                backgroundColor: getColor('red'),
                                data: data[this.state.year]['data']['deductions']
                        }]
  }
  componentDidMount() {
    Chart.defaults.global.defaultFontFamily = "Quicksand";
    fetch("http://192.168.0.104:3000/salary")
      .then((res) => res.json())
      .then(
        (result) => {
		this.setState({ details: result,
			years: Object.keys(result),
			labels: result[this.state.year]['labels'],
                        datasets: this.getChartDataSets(result), 
			doughnutsets: this.getDoughnutDataSets(result),
                });
	  
	  this.mySalaryDoughnut.data.datasets = this.state.doughnutsets;
		console.log(this.mySalaryChart.data.datasets);
	  this.mySalaryChart.data.labels = this.state.labels;
	  this.mySalaryChart.data.datasets = this.state.datasets;
	  this.mySalaryChart.update();
	  this.mySalaryDoughnut.update();
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
    this.drawSalaryChart();
  }

  handleChange(value){
	  this.setState({year: value});
  }

  render() {
	  const years = this.state.years.map((year, index) =>
      		<Radio value={year} key={index}>{year}</Radio>
	  );
    return (
      <div>
    <RadioGroup name="radioList" inline appearance="picker" defaultValue={this.state.year} onChange={this.handleChange}>
	    {years}
    </RadioGroup>
	    <Grid fluid><Row className="show-grid">
	    <Col xs={24} sm={24} md={14} >
        <Panel
          header={"Salary Per Month - " + this.state.year}
          shaded
          style={{ margin: "10px", borderRadius: "16px"}}
        >
          <canvas ref={this.salaryChartRef} />
        </Panel>
	     </Col>
      <Col xs={24} sm={24} md={10}>
	          <Panel
          header={"Salary Per Year - " + this.state.year}
          shaded
          style={{ margin: "10px", borderRadius: "16px" }}
        >
          <canvas ref={this.salaryYearChartRef} />
        </Panel>
	     </Col>
    </Row>
	    </Grid>
      </div>
    );
  }
}
