var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';


class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        }
    }

    componentDidMount() {
       // console.log(this.props.location);
       // this.setState({location: this.props.location});
        //console.log('location ' + this.state.location);
        var that = this;
       // that.setState({location: this.props.location});
        //console.log('location ' + that.state.location);
        console.log(CelestialSettings.URL.menus + "/footer");
        fetch(CelestialSettings.URL.menus + "/footer")
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
              that.setState({ menuItems: res })
            });
    }

    // parseTo() and isInternal() functions are meant to check if menu item is external or
    // if external create usual href Link
    // if internal use Link from 'react-router-dom'
    // https://gist.github.com/shprink/bf9599e1d66b9dc4d151e89c1199ccb8
    // without using functions links would return something similar to:
    // https://appurl.com/https://gmail.com
    
     parseTo(to) {
        let parser = document.createElement('a');
        parser.href = to;
        return parser;
    }

    isInternal(toLocation) {
        return window.location.host === toLocation.host;
    }

    renderMenuItem(url, title){
        const toLocation = this.parseTo(url);
        const isInternal = this.isInternal(toLocation);
        if (isInternal) {
            url = url.split('/').slice(3).join('/');
            url = '/' + url;
          return (<Link to={url}>{title}</Link>);
        } else {
           return (<a href={url}>{title}</a>);
        }
    }

    renderParentMenuItem(menuItem){
        return (
          <div className='navToggle'>
           <a href='#' data-toggle="dropdown" className="dropdown-toggle" >{menuItem.title}</a>
           <ul role="menu" className=" dropdown-menu">{this.renderMenuItems(menuItem.children)}</ul>
          </div>
        )
        
    }

    renderMenuItems(menuItemList) {
      return menuItemList.map((menuItem, i) => {
        if (_.isEmpty(menuItem.children)){
          return (
              <li className="nav-item nav-link" key={i}>{this.renderMenuItem(menuItem.url,menuItem.title)}</li>
          )
        } else {
          return (
                <li className="nav-item nav-link" key={i}>{this.renderParentMenuItem(menuItem)}</li>                
          )
        }
     });
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
               <ul id="menu-footer" className="list-unstyled">
                { 
                   this.state.menuItems != undefined ?
                   this.renderMenuItems(this.state.menuItems) :
                   this.renderLoading()
                }
             </ul>
           </div>
        );
    }
}

export default Navigation;
