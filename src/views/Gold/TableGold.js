import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row,Table } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class TableGold extends Component {
  render() {
    var dataInfo = []
    if(this.props.data){
       dataInfo = this.props.data.reverse();
       var total = 0


       for ( var element of dataInfo){
          total+= parseInt(element.count)
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
          label: 'Số lượng vàng',
          field: 'count',
          width: 100
        }
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
                      <th>Số vàng</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Tổng </td>
                      <td>{total}</td>
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

export default TableGold;
