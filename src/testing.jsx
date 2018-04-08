import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Grid, Row, Col } from 'react-bootstrap';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Testing extends React.Component {
    
  constructor(props, context) {
     super(props, context);
 
     this.handleDismiss = this.handleDismiss.bind(this);
     this.handleShow = this.handleShow.bind(this);
 
     this.state = {
       show: true
     };
   }
 
   handleDismiss() {
     this.setState({ show: false });
   }
 
   handleShow() {
     this.setState({ show: true });
   }
 
   render() {
     if (this.state.show) {
       return (
         <div>
         <Grid>
  <Row className="show-grid">
    <Col md={12}>
         <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
           <h4>Oh snap! You got an error!</h4>
           <p>
             Change this and that and try again. Duis mollis, est non commodo
             luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
             Cras mattis consectetur purus sit amet fermentum.
           </p>
           <p>
             <Button bsStyle="danger">Take this action</Button>
             <span> or </span>
             <Button onClick={this.handleDismiss}>Hide Alert</Button>
           </p>
         </Alert>
         </Col>
       </Row>
  <Row className="show-grid">
    <Col xs={12} md={8}>
      <code>&lt;{'Col xs={12} md={8}'} /">">">">&gt;</code>
    </Col>
    <Col xs={6} md={4}>
      <code>&lt;{'Col xs={6} md={4}'} /">">">">&gt;</code>
    </Col>
  </Row>

  <Row className="show-grid">
    <Col xs={6} md={4}>
      <code>&lt;{'Col xs={6} md={4}'} /">">">">&gt;</code>
    </Col>
    <Col xs={6} md={4}>
      <code>&lt;{'Col xs={6} md={4}'} /">">">">&gt;</code>
    </Col>
    <Col xsHidden md={4}>
      <code>&lt;{'Col xsHidden md={4}'} /">">">">&gt;</code>
    </Col>
  </Row>

  <Row className="show-grid">
    <Col xs={6} xsOffset={6}>
      <code>&lt;{'Col xs={6} xsOffset={6}'} /">">">">&gt;</code>
    </Col>
  </Row>

  <Row className="show-grid">
    <Col md={6} mdPush={6}>
      <code>&lt;{'Col md={6} mdPush={6}'} /">">">">&gt;</code>
    </Col>
    <Col md={6} mdPull={6}>
      <code>&lt;{'Col md={6} mdPull={6}'} /">">">">&gt;</code>
    </Col>
  </Row>
</Grid>;
</div>
       );
     }
 
     return (
       <Grid>
        <Row className="show-grid">
            <Button onClick={this.handleShow}>Show Alert</Button> 
        </Row>
       </Grid>
    
     )
   }
}

export default Testing;
