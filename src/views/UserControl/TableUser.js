import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row,Table } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class TableUser extends Component {
  render() {
    var dataInfo = []
    if(this.props.data){
       dataInfo = this.props.data.reverse();
       var total_reg = 0
       var total_reLogin = 0
       var total_fb = 0

       for ( var element of dataInfo){
          total_reg += parseInt(element.REG)
          total_reLogin += parseInt(element.RE_LOGIN)
          total_fb += parseInt(element.FACEBOOK)
       }
       
    }
    const data = {
      columns: [
        {
          label: 'Ngày',
          field: 'date',
          width: 150
        },
        {
          label: 'Quốc gia',
          field: 'country_code',
          width: 100
        },
        {
          label: 'Đăng ký mới',
          field: 'REG',
          width: 200
        },
        {
          label: 'Đăng nhập lại',
          field: 'RE_LOGIN',
          width: 100
        },
        {
          label: 'Sử dụng Facebook mới',
          field: 'FACEBOOK',
          width: 150
        },
      ],
      rows: dataInfo
    }
    if( this.props.data.length !== 0)  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" >
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> 
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    className="btn btn-success float-right"  
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                </CardHeader>
                <CardBody>
                  <MDBDataTable id ="table-to-xls"
                    striped
                    bordered
                    hover
                    data={data}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Thống Kê
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                    <tr>
                      <th></th>
                      <th>Đăng ký mới</th>
                      <th>Đăng nhập lại</th>
                      <th>Sử dụng facebook mới</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Tổng </td>
                      <td>{total_reg}</td>
                      <td>{total_reLogin}</td>
                      <td>{total_fb}</td>
                    </tr>
                   
                    </tbody>
                  </Table>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </div>
      );
    return <div>No data</div>
  }
}

export default TableUser;
