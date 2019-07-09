import React, { Component, lazy, Suspense } from 'react';
import {Line } from 'react-chartjs-2';
import {Card,CardBody,CardTitle,Col,Row} from 'reactstrap';
import { mainChartOpts } from '../../const/const';

var randomColor = require('randomcolor');

class ChartGold extends Component {
  chart =()=>{
    if(this.props.data.length!==0){
      var dates = []
      var count =[]

      for (let label of this.props.data ){
        count.push(label.count)
        dates.push(label.date)

      }
      var label =['SỐ VÀNG']
      var datasets = []
    
        datasets.push({
            label: label,
            backgroundColor:'transparent',
            borderColor: randomColor(),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: count ,
        })
      
      const mainChart = {
        labels: dates,
        datasets: datasets
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
                    <CardTitle className="mb-0">BIỂU ĐỒ SỐ VÀNG</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                {this.props.data.length!==0 ? <Line data={mainChart} options={mainChartOpts} height={300} /> : 'No data'}  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChartGold;
