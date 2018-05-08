var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class AboutHome extends React.Component {
    renderContent() {
        return (
            <section id="about" data-type="background" data-speed="10"  style={{backgroundImage: "url(" + this.props.content.acf.about_section_background_image.url + ")"}}>
              <Grid className='about'>
                <Col md={12}>
                      <Col md={8}>
                        <h3 dangerouslySetInnerHTML={{ __html: this.props.content.acf.about_section_title}} />
                         <p className="card-text" dangerouslySetInnerHTML={{ __html: this.props.content.acf.about_section_body }}  />
                       </Col>
                       <Col md={4}>
                                {
                                    this.props.content.acf.about_section_image ? <img className="center-block img-circle" src={this.props.content.acf.about_section_image.sizes.medium} alt="portrait of richie" /> : null
                                }
                        </Col>
                </Col>
              </Grid>
            </section>
        
        )
    }

    render() {
        return (
            <div>
                { 
                   this.renderContent()
                }
               
            </div>
        );
    }
}

export default AboutHome;
