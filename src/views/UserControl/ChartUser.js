import React, { Component, lazy, Suspense } from 'react';
import {Line } from 'react-chartjs-2';
import {Card,CardBody,CardTitle,Col,Row} from 'reactstrap';
import { mainChartOpts } from '../../const/const';

var randomColor = require('randomcolor');

class ChartUser extends Component {
  chart =()=>{
    if(this.props.data.length!==0){
      var lables = []
      var reg =[]
      var reLogin = []
      var fb = []
      for (let label of this.props.data){
        lables.push(label.date)
        reg.push(label.REG)
        reLogin.push(label.RE_LOGIN)
        fb.push(label.FACEBOOK)
      }
      var label =['ĐĂNG KÝ MỚI','ĐĂNG NHẬP LẠI','sỬ DỤNG FACEBOOK MỚI']
      var data = [reg,reLogin,fb]
      var datasets = []
      for(let i = 0; i<3 ; i++){
        datasets.push({
            label: label[i],
            backgroundColor:'transparent',
            borderColor: randomColor(),
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data[i],
        })
      }
      const mainChart = {
        labels: lables,
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
                    <CardTitle className="mb-0">BIỂU ĐỒ SỐ LƯỢNG ĐĂNG KÝ MỚI, ĐĂNG NHẬP LẠI, SỬ DỤNG FACEBOOK MỚI</CardTitle>
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

export default ChartUser;
