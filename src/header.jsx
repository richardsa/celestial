import React from 'react';
import { Link } from 'react-router-dom';
import Primary from './primary';

const Header = () => (
        <div>
        <header id="masthead" className="site-header" role="banner">
        <div className="navbar-wrapper">
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container-fluid">
              <div className="navbar-wrapper">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <i className="fa fa-bars fa-toggle fa-lg" aria-hidden="true"></i>
                </button>
                <Link className="navbar-brand" to={CelestialSettings.path} >Celestial</Link>
              </div>
                <Primary />
            
           
              {/*<div className="navbar-collapse collapse" id="navbarNavAltMarkup">
                    <ul id="menu-primary" className="nav navbar-nav navbar-right">
                       <li><Link className="nav-item nav-link active" to={CelestialSettings.path} >Home <span className="sr-only">(current)</span></Link></li>
                        <li><Link className="nav-item nav-link" to={CelestialSettings.path + "posts/"} >Posts</Link></li>
                        <li><Link className="nav-item nav-link" to={CelestialSettings.path + "products/"} >Products</Link></li>
                    </ul>
                </div>
                */}
              </div>
              </nav >
        
        </div>
      </header>
   </div>
);

export default Header;