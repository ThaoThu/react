import React, {Component} from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import TableMatch from './TableMatch';
import ChartMatch from './ChartMatch';
const { RangePicker } = DatePicker;
const { Option } = Select;

class Match extends Component {

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

    };
  }
  componentWillMount() {
    if(!localStorage.getItem("username")){
      this.props.history.push('/login')
    }
  }
  
  componentDidMount(){
    this.getDataMatch();
  }
  getDataMatch = () => {
    let {from,to} = this.state;
      Axios.post('http://api.webadmin.xgame.xtel.vn/match',{from,to})
      .then(res=>{
          if(res.data.code === 200){
            this.setState({data: res.data.data})
          }
        })
  }
  

  onChangeDate = (dates, dateStrings) => {
   this.setState({
     from : dateStrings[0],
     to : dateStrings[1],
     data :[]
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
          {<TableMatch data = {this.state.data}></TableMatch>}
        </TabPane>
        <TabPane tabId="2">
          {<ChartMatch data = {this.state.data}></ChartMatch>}
        </TabPane>
        
      </>
    );
  }

  render() {
   
    return (
      <div className="animated fadeIn">
        <Row>  
          <Col xs="12">
            <RangePicker
              showTime
              defaultValue={[moment().subtract(7,'d'), moment()]}
              format="YYYY-MM-DD"
              onChange={this.onChangeDate}
            />
            <span className = "mr-4"></span>
           
          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.getDataMatch}>Lọc</Button>
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

export default Match;
