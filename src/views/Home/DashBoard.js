import React, { Component } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {   CardColumns, DropdownItem, ButtonDropdown, Card, CardBody, CardHeader,DropdownMenu, DropdownToggle,Row,Col} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Axios from 'axios';


const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGame:[],
      gameName : 'Gold Miner',
      gameId : 1,
      data : {},
      dropdownOpen: new Array(19).fill(false),
      isLoading : true
    }
    this.toggle = this.toggle.bind(this); 
  }
  componentWillMount() {
    if(!localStorage.getItem("username")){
      this.props.history.push('/login')
    }
  }
  componentDidMount(){
    this.getListGame();
    this.getData();

  }
  getListGame = () => {
    Axios.get('http://api.webadmin.xgame.xtel.vn/').then(res => {
      // console.log(res.data)
      if(res.data.code === 200){
        this.setState({
          listGame : res.data.data
        })
      }
    })
  }
  getData = () => {
    Axios.post('http://api.webadmin.xgame.xtel.vn/dashboard-data',{game_id:this.state.gameId}).then(res => {
        if(res.data.code ===200){
          this.setState({
            data : res.data.data,
            isLoading : false
          })
        }
    })
  }
  handleChange = (e) => {
    // console.log(e.target)
    this.setState ({
    
      gameName:e.target.textContent,
      gameId : e.target.value
    },()=>{
      this.getData()
    })
  }
  renderDropdown = (data) => {
    return data.map((game,index)=>{
      return(   
          <DropdownItem key ={index} onClick = {this.handleChange} value ={game.id} >{game.game_name}</DropdownItem>
      )
    })
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  doughnutChart = (data,name) =>{
    if(data){
      var labels = []
      var items = []
      var colors = []
      var color =''
      for(var i = 0; i<20 ; i++){
        color ='#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        colors.push(color)
      }
      data.forEach(label => {
         labels.push(label.country_code)
         items.push(label.sum_register)
      }); 
    }
    const doughnut = {
      labels: labels,
      datasets: [
        {
          data: items,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        }],
    };
    return doughnut
  }
  lineChart=(data,name,color)=>{

    if(data){
      var labels = []
      var items = []
      
      data.forEach(label => {
         labels.push(label.a)
         items.push(label.s)
      }); 
    }
  
   let line = {
     labels: labels, 
     datasets: [
       {
         label: name, 
         fill: false,
         lineTension: 0.1,
         backgroundColor: color,
         borderColor: color,
         borderCapStyle: 'butt',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
         pointBorderColor: color,
         pointBackgroundColor: '#fff',
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         pointHoverBackgroundColor: color,
         pointHoverBorderColor: color,
         pointHoverBorderWidth: 2,
         pointRadius: 1,
         pointHitRadius: 10,
         data: items, 
       },
     ],
   };
   return line
  }
  
  render() {
    let {data,listGame,gameName} = this.state
    if(data){
      var newRegister = this.lineChart(data.newRegister,'Đăng ký mới','rgba(75,192,192,1)')
      var activeUser = this.lineChart(data.active_user,'Đăng nhập lại trong 7 ngày','red')
      var fbUser = this.lineChart(data.fb_user,'User sử dụng mới Facebook trong 7 ngày','orange')
      var goldBought = this.lineChart(data.goldBought,'Vàng user mua trong 7 ngày','green')
      var goldGen = this.lineChart(data.goldGen,'Vàng sinh ra từ hệ thống trong 7 ngày','blue')
      var Ipa = this.lineChart(data.Ipa,'Doanh thu IPA trong 7 ngày','brown')
      var topRevenue = this.doughnutChart(data.topRevenue,'Top 20 quốc gia có doanh thu nhiều nhất trong 7 ngày')
      var goldUsed = this.lineChart(data.goldUsed,'Vàng user dùng để mua/sửa item trong 7 ngày','Pink')
      var topRegister = this.doughnutChart(data.topRegister,'Top 20 quốc gia user đăng ký nhiều nhất trong 7 ngày')
    }

    if(listGame){
      var render = this.renderDropdown(listGame)
    }

    return (
      <div className="animated fadeIn">
       <Row>
         <Col xs="12">
            <Card>
              <CardHeader>
                  <ButtonDropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                    <DropdownToggle caret>
                      { gameName }
                    </DropdownToggle>
                    {listGame && (
                      <DropdownMenu right>
                          {render}
                    </DropdownMenu>
                    )} 
                  </ButtonDropdown>
                  {this.state.isLoading &&<p className = "text-center">Loading...</p>}
              </CardHeader>
            </Card>
         </Col>
       </Row>
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
            Đăng ký mới trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
               {data && <Line data={newRegister} options={options} /> }
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Đăng nhập lại trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&  <Line data={activeUser} options={options} />}
              </div>
            </CardBody>
          </Card>  
          <Card>
            <CardHeader>
            Top 20 quốc gia user đăng ký nhiều nhất trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&   <Doughnut data={topRegister} />}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            User sử dụng mới Facebook trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&  <Line data={fbUser} options={options} />}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Vàng user mua trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&   <Line data={goldBought} options={options} />}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Doanh thu IPA trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                {data &&   <Line data={Ipa} options={options} /> }
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Top 20 quốc gia có doanh thu nhiều nhất trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                    {data &&   <Doughnut data={topRevenue} /> }
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Vàng user dùng để mua/sửa item trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&   <Line data={goldUsed} options={options} />}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
            Vàng sinh ra từ hệ thống trong 7 ngày
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {data &&  <Line data={goldGen} options={options} />}
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default DashBoard;
