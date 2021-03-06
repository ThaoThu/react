import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row,Table } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class Top20Table extends Component {
  render() {
    var dataInfo = []
    if(this.props.data){
       dataInfo = this.props.data.reverse();
       var total_reg = 0
       for ( var element of dataInfo){
          total_reg += parseInt(element.count)
    
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
          label: 'Quốc Gia',
          field: 'country_code',
          width: 100
        },
        {
          label: 'Lượt Đăng Ký',
          field: 'count',
          width: 200
        }
      ],
      rows: dataInfo
    }
    if( this.props.data.length !== 0)  
    // console.log(this.props.data)
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
                      <th>Lượt Đăng Ký</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Tổng </td>
                      <td>{total_reg}</td>
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

export default Top20Table;
