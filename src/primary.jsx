var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// LinkContainer needed to connect react router and react-bootstrap
// https://stackoverflow.com/a/36933127
import { LinkContainer } from 'react-router-bootstrap';

class Primary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: []
        }
    }

    componentDidMount() {
        var that = this;
        console.log(CelestialSettings.URL.menus + "/primary");
        fetch(CelestialSettings.URL.menus + "/primary")
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

    renderMenuItems(menuItemList) {
      return menuItemList.map((menuItem, i) => {
        if (_.isEmpty(menuItem.children)){
          return (
              this.renderMenuItem(menuItem.url, menuItem.title, i)
          )
        } else {
          return (
              this.renderParentMenuItem(menuItem)
                              
          )
        }
     });
    }

    renderMenuItem(url, title, i){
          const toLocation = this.parseTo(url);
          const isInternal = this.isInternal(toLocation);
          if (isInternal) {
              url = url.split('/').slice(3).join('/');
              url = '/' + url;
            return (
              <LinkContainer  key={i} to={url}>
                <NavItem  href={url} >
                  {title}
                </NavItem>
              </LinkContainer>
            )
          } else {
             return (
               <NavItem href={url} key={i} eventKey={i}>
                {title}
               </NavItem>
             );
          }
      }

      renderChildMenuItem(url, title, i){
        const toLocation = this.parseTo(url);
        const isInternal = this.isInternal(toLocation);
        if (isInternal) {
            url = url.split('/').slice(3).join('/');
            url = '/' + url;
          return (
            <LinkContainer  key={i} to={url}>
                <MenuItem href={url}
                 eventKey={i}>{title}
                </MenuItem>
            </LinkContainer>
          )
        } else {
           return (
             <MenuItem href={url} key={i} eventKey={i}>
              {title}
             </MenuItem>
           );
        }
    }

    renderParentMenuItem(menuItem){
        return (
          <NavDropdown key={menuItem.title} eventKey={3} title={menuItem.title} id="basic-nav-dropdown">
            {this.renderChildItems(menuItem.children)}
          </NavDropdown>
        )
        
    }
    renderChildItems(childItems){
      return childItems.map((childItem, i) => {
        return (
          this.renderChildMenuItem(childItem.url, childItem.title, i)
        )
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
            <Navbar inverse fixedTop collapseOnSelect fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link className="navbar-brand" to={CelestialSettings.path} >Celestial</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
               <Nav pullRight>
                { 
                   this.state.menuItems != undefined ?
                   this.renderMenuItems(this.state.menuItems) :
                   this.renderLoading()
                }
             </Nav>
             </Navbar.Collapse>
           </Navbar>
        );
    }
}

export default Primary;
