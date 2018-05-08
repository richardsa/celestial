var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

import AboutHome from './about-home';

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
        window.onbeforeunload = function () { window.scrollTo(0, 0); }
        // above scroll to not working
        // using below for now
        // https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing/18573599#18573599
        setTimeout(function () {
            window.scrollTo(0, 0);
        },2);
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
            <div>
              <AboutHome content={this.state.page} />
            </div>
        
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
            
           
                { 
                   this.state.page != undefined ?
                   this.renderPage() :
                   this.renderEmpty()
                }
               
            </div>
        );
    }
}

export default Home;
