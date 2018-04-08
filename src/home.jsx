var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Home extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
            page: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
       // var slug = url.pop() || url.pop();
        console.log(CelestialSettings.URL.api + "/pages?slug=home" )
        fetch(CelestialSettings.URL.api + "/pages?slug=home" )
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ page: res[0] })
            });
    }
    
      renderPage() {
          if (_.isEmpty(this.state.page)) {
        return (
            <div>
            {
                this.renderLoading()
            }
            </div>
        ) 
          }
        return (
          
            <Row>
              <Col md={12}>
                  <Col md={8}>
                    <h3 dangerouslySetInnerHTML={{ __html: this.state.page.acf.about_section_title}} />
                     <p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.page.acf.about_section_body }}  />
                   </Col>
                   <Col md={4}>
                            {
                                this.state.page.acf.about_section_image ? <img className="center-block img-circle" src={this.state.page.acf.about_section_image.sizes.medium} alt="portrait of richie" /> : null
                            }
                    </Col>
            </Col>
          
            </Row>
        
        )
    }
    
      renderEmpty() {
        return (
            <NotFound />
        )
    }
    
    renderLoading(){
        return (
            <div>
             <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <div className="container">
                
                { 
                   this.state.page != undefined ?
                   this.renderPage() :
                   this.renderEmpty()
                }
                </div>
            </div>
        );
    }
}

export default Home;
