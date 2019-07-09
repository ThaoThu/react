import React, {Component} from 'react';
import {Card,CardHeader, Col,  Row, } from 'reactstrap';
import 'antd/dist/antd.css'; 
import * as moment from 'moment';
import { Select,  DatePicker,Button  } from 'antd';
import Axios from 'axios';
import ChartAll from './ChartAll'
import Top20 from './Top20';
import SingleChart from './SingleChart';


const { RangePicker } = DatePicker;
const { Option } = Select;

class RevenueCountries extends Component {

  constructor(props) {
    super(props);
      
    var toDate= moment().format('YYYY-MM-DD')
    var fromDate = moment().subtract(7,'d').format('YYYY-MM-DD')
    this.state = {
      data :[],
      listGame:[],
      listCountry:[],
      gameId : 1 ,
      countryCode:'all',
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
    this.showChart();
  }
    showChart = () => {
    let {gameId,from,to} = this.state;
      Axios.post('http://api.webadmin.xgame.xtel.vn/control-revenue',{gameId,from,to})
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
 

  render() {
    let {listGame,listCountry,data,countryCode} = this.state
    if(listGame){
      var renderGame = this.renderGame(listGame)
      if(listCountry){
        var renderCountry = this.renderCountry(listCountry)
      }
    }
    console.log(data)
    return (
      <div className="animated fadeIn">
        <Row className = "mb-4">
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
              placeholder="All Country"
              optionFilterProp="children"    
              onChange={this.onChangeCountry}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
            <Option value ="all" >Tất cả</Option>
            <Option value ="top" >Top 20 countries</Option>
            { renderCountry }
          </Select>
          <span className = "mr-4"></span>
          <Button type="primary" onClick = {this.showChart}>Lọc</Button>
          </Col>
        </Row>
        {countryCode === 'all' ? <ChartAll data = {data.data_all} /> : 
          countryCode === 'top' ? <Top20 data = {data.data_top20} top20country = {data.top20} /> 
            : <SingleChart data={data.data_all} code ={countryCode}/>}
      
      </div>
    );
  }
}

export default RevenueCountries;
