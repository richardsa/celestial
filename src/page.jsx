var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: {}
        }
    }

    componentDidMount() {
        this.getContent();
    }
    componentWillReceiveProps(){
        this.getContent();
    }
    
    getContent(){
        // above scroll to not working
        // using below for now
        // https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing/18573599#18573599
        setTimeout(function () {
            window.scrollTo(0, 0);
        },2);

        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();
        console.log('page ' + CelestialSettings.URL.api + "/pages?slug=" + slug );
        fetch(CelestialSettings.URL.api + "/pages?slug=" + slug)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
               that.setState({ page: res })
            });
    }
    
    renderEmpty() {
        var arr = Array.isArray(this.state.page);
        if (!arr ){
       
        return (
            <div>
            {
                this.renderLoading()
                
            }
            </div>
            
        ) 
               
          } else 
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
    
    renderPage(){
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
            <div id="primary" className="content-area">
	        	<main id="main" className="site-main" role="main">
	        	<div className='page-header'>
	        	    <h1 className='text-center'>{this.state.page[0].title.rendered}</h1>
	        	</div>
		            <div dangerouslySetInnerHTML={{ __html: this.state.page[0].content.rendered }} />
            	</main>
	        </div>
        )
    }

    render() {
        return (
            <div className="container post-entry">
                { 
                   this.state.page == undefined || _.isEmpty(this.state.page) ?
                   this.renderEmpty():
                   this.renderPage()
                }
            </div>
        );
    }
}

export default Page;
