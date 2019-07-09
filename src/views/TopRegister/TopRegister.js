import React, {Component} from 'react';
import {Card,CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
// import Tables from '../Tables/Tables';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import Top20Chart from './Top20Chart';
import Top20Table from './Top20Table';
// import TbUser from '../../TbUser/TbUser';
const { RangePicker } = DatePicker;
const { Option } = Select;

class TopRegister extends Component {

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
      from:fromDate,
      to:toDate,
      top20country: [],
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
    this.getTopCountries();
  }
  getTopCountries = () => {
    let {gameId,from,to} = this.state;
      Axios.post('http://api.webadmin.xgame.xtel.vn/top-register',{gameId,from,to})
      .then(res=>{
        // console.log("data",res.data)
          if(res.data.code === 200){
            this.setState({data: res.data.data, top20country: res.data.top_20_country})
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
  // renderCountry = (data) => {
  //   return data.map((country,index)=>{
  //     return(   
  //       <Option key ={index} value ={country.country_iso_code} >{country.country_name}</Option>
  //     )
  //   })
  // }
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
          {<Top20Table data = {this.state.data}></Top20Table>}
        </TabPane>
        <TabPane tabId="2">
          {<Top20Chart  data = {this.state.data} top20country={this.state.top20country}></Top20Chart> }
        </TabPane>
        
      </>
    );
  }

  render() {
    let {listGame} = this.state
    // console.log(this.state)
    if(listGame){
      var renderGame = this.renderGame(listGame)
 
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
                  placeholder="Select a game"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  placeholder ='Gold Miner'
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
              showTime
              defaultValue={[moment().subtract(7,'d'), moment()]}
              format="YYYY-MM-DD"
              onChange={this.onChangeDate}
            />
            <span className = "mr-4"></span>

          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.getTopCountries}>Lọc</Button>
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

export default TopRegister;
