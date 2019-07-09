import React, {Component} from 'react';
import {Card,CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import TableUser from './TableUser';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import ChartUser  from './ChartUser';
const { RangePicker } = DatePicker;
const { Option } = Select;

class UserControl extends Component {

  constructor(props) {
    super(props);
      
    var toDate= moment().format('YYYY-MM-DD')
    var fromDate = moment().subtract(7,'d').format('YYYY-MM-DD')
    this.toggle = this.toggle.bind(this);
    this.state = {
      data :[],
      activeTab: new Array(4).fill('1'),
      listGame:[],
      listCountry:[],
      gameId : 1 ,
      countryCode: '',
      from:fromDate,
      to:toDate,

    };
  }
  componentWillMount() {
    if(!localStorage.getItem("username")){
      this.props.history.push('/login')
    }
  }
  
  componentDidMount(){
    this.getListGame();
    this.getlistCountry();
    this.getDataControlUSer();
  }
  getDataControlUSer = () => {
    let {gameId,from,to,countryCode} = this.state;
    // console.log(gameId,from,to,countryCode)
      Axios.post('http://api.webadmin.xgame.xtel.vn/control-user',{gameId,from,to,countryCode})
      .then(res=>{
        // console.log("data",res.data)
          if(res.data.code === 200){
            this.setState({data: res.data.data})
          }
        })
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
  getlistCountry = () => {
    Axios.get('http://api.webadmin.xgame.xtel.vn/country').then(res => {
      // console.log(res.data)
      if(res.data.code === 200){
        this.setState({
          listCountry : res.data.data
        })
      }
    })
  }
  onChange = (value) => {
    this.setState({
      gameId : value,
      data :[]

    })
  }
  onChangeCountry =(value) =>{
    this.setState({
      countryCode : value,
      data :[]
    })
  }
  onChangeDate = (dates, dateStrings) => {
   this.setState({
     from : dateStrings[0],
     to : dateStrings[1],
     data :[]
   })
  }
  renderGame = (data) => {
    return data.map((game,index)=>{
      return(   
        <Option key ={index} value ={game.id} >{game.game_name}</Option>
      )
    })
  }
  renderCountry = (data) => {
    return data.map((country,index)=>{
      return(   
        <Option key ={index} value ={country.country_iso_code} >{country.country_name}</Option>
      )
    })
  }
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {<TableUser data = {this.state.data}></TableUser>}
        </TabPane>
        <TabPane tabId="2">
          {<ChartUser data = {this.state.data}></ChartUser>}
        </TabPane>
        
      </>
    );
  }

  render() {
    let {listGame,listCountry} = this.state
    // console.log(this.state)
    if(listGame){
      var renderGame = this.renderGame(listGame)
      if(listCountry){
        var renderCountry = this.renderCountry(listCountry)
      }
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs ="12">
            <Card>
              <CardHeader>
              <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Gold Miner"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {renderGame}
                </Select>
              </CardHeader>
            </Card>
          </Col>   
          <Col xs="12">
            <RangePicker
              ranges={{
                // Today: [moment(), moment()],
                // 'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              showTime
              defaultValue={[moment().subtract(7,'d'), moment()]}
              format="YYYY-MM-DD"
              onChange={this.onChangeDate}
            />
            <span className = "mr-4"></span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="All countries"
              optionFilterProp="children"
              onChange={this.onChangeCountry}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
            { renderCountry }
          </Select>
          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.getDataControlUSer}>Lọc</Button>
          </Col>
          <Col xs="12"  className="mb-4 mt-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Thống kê
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Biểu đồ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
         
      </div>
    );
  }
}

export default UserControl;
