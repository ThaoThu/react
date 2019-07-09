import React, {Component} from 'react';
import {Card,CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import TableGold from './TableGold';
import ChartGold from './ChartGold';
const { RangePicker } = DatePicker;
const { Option } = Select;

class Gold extends Component {

  constructor(props) {
    super(props);
      
    var toDate= moment().format('YYYY-MM-DD')
    var fromDate = moment().subtract(7,'d').format('YYYY-MM-DD')
    this.toggle = this.toggle.bind(this);
    this.state = {
      data :[],
      activeTab: new Array(4).fill('1'),
      from:fromDate,
      to:toDate,
      type : 1,
      listGame: [],
      gameId : 1

    };
  }
  componentWillMount() {
    if(!localStorage.getItem("username")){
      this.props.history.push('/login')
    }
    this.getDataGold();
  }
  
  componentDidMount(){
    this.getListGame();
   
  }
  getDataGold = () => {
    let {from,to,type,gameId} = this.state;
      Axios.post('http://api.webadmin.xgame.xtel.vn/gold',{from,to,type,gameId})
      .then(res=>{
          if(res.data.code === 200){
            this.setState({data: res.data.data})
          }
        })
  }
  renderGame = (data) => {
    return data.map((game,index)=>{
      return(   
        <Option key ={index} value ={game.id} >{game.game_name}</Option>
      )
    })
  }
  

  onChangeDate = (dates, dateStrings) => {
   this.setState({
     from : dateStrings[0],
     to : dateStrings[1],
     data :[]
   })
  }
  onChange = (value) => {
    this.setState({
      type : value,
      data :[]

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
          {<TableGold data = {this.state.data}></TableGold>}
        </TabPane>
        <TabPane tabId="2">
          {<ChartGold data = {this.state.data}></ChartGold>}
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
    let {type,data} = this.state
// console.log(data)
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
              showTime
              defaultValue={[moment().subtract(7,'d'), moment()]}
              format="YYYY-MM-DD"
              onChange={this.onChangeDate}
            />
            <span className = "mr-4"></span>
           <Select
                showSearch
                style={{ width: 250 }}

                optionFilterProp="children"
                onChange={this.onChange}
                placeholder = "Vàng sinh ra"
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
           >
               <Option value = "1">Vàng sinh ra</Option>
               <Option value = "2">Vàng người dùng sử dụng</Option>
           </Select>
          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.getDataGold}>Lọc</Button>
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

export default Gold;
