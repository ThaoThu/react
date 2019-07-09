import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        username :'',
        password :'',
        msg : ''
        // loading :''
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name] : e.target.value

    })
  }
  handleSubmit =  async(e) => {
    this.setState({
      msg:''
    })
    e.preventDefault();
    let {username,password} =this.state

    if(username && password){
      axios.post('http://api.webadmin.xgame.xtel.vn/', { username,password })
      .then(res => {
        // console.log(res);
        console.log(res.data);
        if(res.data.errors){
          this.setState({
            msg : res.data.errors[0].msg
          })
        }else{
          localStorage.setItem('username',username)
          this.props.history.push('/dashboard')
        }
      })
      
    }
    else{
      this.setState({
        msg : "Required"
      })
    }
  }
  render() {
    let {username,password,msg} = this.state
    // console.log(this.state)
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit = {this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username" value={username} onChange = {this.handleInput} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange = {this.handleInput} />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <p style= {{color:'red'}}>{msg || ''}  </p>
                        </Col>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                      </p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
