import React from 'react';
import { Link } from 'react-router-dom';
import Primary from './primary';
import Navigation from './navigation';

const Header = () => (
    <div>
        <header id="masthead" className="site-header" role="banner">
            <Primary />
        </header>
   </div>
);

export default Header;