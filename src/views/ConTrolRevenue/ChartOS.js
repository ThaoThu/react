import React, { Component } from 'react';
import {Line } from 'react-chartjs-2';
import {Card,CardBody,CardTitle,Col,Row} from 'reactstrap';
import { mainChartOpts, groupBy } from '../../const/const';

var randomColor = require('randomcolor');

class ChartOS extends Component {
  chart =()=>{
      // console.log(this.props.data)
      if(this.props.data){
          if(this.props.data.length !== 0){
              
              var chart_data = []
              const groupByDate = groupBy('a')
              var dateGroup = groupByDate(this.props.data)
              var dates = []
              var value = []
              var total = 0
              var label =['TỔNG DOANH THU']
              var datasets = []
              var color = randomColor()

              for( var date in dateGroup) {
                  dates.push(date)
                  dateGroup[date].map((element,index)=>{
                    total += element.s
                  })
                  
                  value.push(total)
                  total = 0
              }
              datasets.push({
                  label: label,
                  backgroundColor:'transparent',
                  borderColor:color ,
                  // backgroundColor : color,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: value,
              })
              
              const mainChart = {
                labels: dates,
                datasets: datasets
              }
                return mainChart  

        }

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
                    <CardTitle className="mb-0">BIỂU ĐỒ TỔNG DOANH THU THEO HỆ ĐIỀU HÀNH</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                {this.props.data && this.props.data.length!==0 ? <Line data={mainChart} options={mainChartOpts} height={300} /> :'No data'}  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChartOS;
