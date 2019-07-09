import React, { Component } from 'react';
import {Line } from 'react-chartjs-2';
import {Card,CardBody,CardTitle,Col,Row} from 'reactstrap';
import { mainChartOpts } from '../../const/const';

var randomColor = require('randomcolor');

class SingleChart extends Component {
  chart =()=>{
      
      if(this.props.data){
          if(this.props.data.length !== 0){
            var dates = []
            var value = []
            var label =[`DOANH THU NƯỚC ${this.props.code}`]
            var datasets = []
            var color = randomColor()
            this.props.data.map((element,index)=>{
                if(element.country_code === this.props.code){
                      dates.push(element.a)
                      value.push(element.s)
                }
            })

      
                datasets.push({
                    label: label,
                    backgroundColor:'transparent',
                    borderColor:color ,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: value,
                })
                // console.log(this.props.data)
                // console.log(value)
                // console.log(dates)
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
                    <CardTitle className="mb-0">BIỂU ĐỒ DOANH THU</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                {this.props.data ? this.props.data.length!==0 && <Line data={mainChart} options={mainChartOpts} height={300} /> :'No data'}  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SingleChart;
