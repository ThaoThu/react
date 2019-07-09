import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,

} from 'reactstrap';

import { mainChartOpts, groupBy } from '../../const/const';

var randomColor = require('randomcolor');



class Top20Chart extends Component {
  chart =()=>{
     
    if(this.props.data.length!==0){
        var chart_data = []
        const groupByDate = groupBy('date')
        var dateGroup = groupByDate(this.props.data.reverse())
        var dates = []

        for (var date in dateGroup){
            dates.push(date)
        }

        this.props.top20country.map((country, country_index) => {
            var value = []
            dates.map((date, date_index) => {
                var i = 0
                this.props.data.map((single_data, index) => {
                    if(single_data.country_code === country && single_data.date === date){
                        value.push(single_data.count);
                        i = 1
                    }
                })
                if(i === 0){
                    value.push(0)
                } 
            })
            var color = randomColor();
            chart_data.push({
                label : country,
                backgroundColor:'transparent',
                borderColor : color,
                data : value
            })
        })
        const mainChart = {
            labels: dates,
            datasets: chart_data
        };
         return mainChart


    }
}


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    var mainChart = this.chart()
   
    // console.log(this.props.data)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <CardTitle className="mb-0">Top 20 Nước Đăng Ký Nhiều Nhất</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                 {this.props.data.length!==0 && <Line data={mainChart} options={mainChartOpts} height={300} />} 
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Top20Chart;
