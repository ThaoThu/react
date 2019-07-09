import React, {Component} from 'react';
import {Card,CardHeader, Col,  Row, } from 'reactstrap';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import ChartOS from './ChartOS'



const { RangePicker } = DatePicker;
const { Option } = Select;

class ControlOs extends Component {

  constructor(props) {
    super(props);
      
    var toDate= moment().format('YYYY-MM-DD')
    var fromDate = moment().subtract(7,'d').format('YYYY-MM-DD')
    this.state = {
      data :[],
      listGame:[],
      listiOS:[{code :1,name:'Android'},{code:2,name:'iOS'}],
      gameId : 1 ,
      os:'',
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
    this.showChart();
  }
    showChart = () => {
    let {gameId,from,to,os} = this.state;
      Axios.post('http://api.webadmin.xgame.xtel.vn/control-revenue-os',{gameId,from,to,os})
      .then(res=>{
        // console.log(res.data)
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

  onChange = (value) => {
    this.setState({
      gameId : value,
      data :[]

    })
  }
  onChangeiOS =(value) =>{
    this.setState({
      os : value,
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
  renderIos = (data) => {
    return data.map((iosType,index)=>{
      return(   
        <Option key ={index} value ={iosType.code} >{iosType.name}</Option>
      )
    })
  }
 

  render() {
    let {listGame,listiOS,data,os} = this.state
    if(listGame){
      var renderGame = this.renderGame(listGame)
      var renderIos = this.renderIos(listiOS)
      
    }
    // console.log(this.state)
    // console.log(data)
    return (
      <div className="animated fadeIn">
        <Row className = "mb-4">
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
              optionFilterProp="children"
              value ={os}
              onChange={this.onChangeiOS}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option  value ="">ALL OS</Option>
            { renderIos }
          </Select>
          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.showChart}>Lọc</Button>
          </Col>
        </Row>
        <ChartOS data = {data}/>
     
      </div>
    );
  }
}

export default ControlOs;
