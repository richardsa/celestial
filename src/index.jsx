import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';
const history = createBrowserHistory();

import Header from './header';
import Footer from './footer';
import Home from './home';
import Posts from './posts';
import Post from './post';
import Products from './products';
import Product from './product';
import Testing from './testing';
import Archive from './archive';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

// Load the Sass file
require('./style.scss');

const App = () => (
    <div id="page-inner">
        <Header />
        <div id="content">
            <Switch>
                <Route exact path={CelestialSettings.path} component={Home} />
                <Route exact path={CelestialSettings.path + 'posts'} component={Posts} />
                <Route exact path={CelestialSettings.path + 'posts/:slug'} component={Post} />
                <Route exact path={CelestialSettings.path + 'products'} component={Products} />
                <Route exact path={CelestialSettings.path + 'products/:product'} component={Product} />
                <Route exact path={CelestialSettings.path + 'category/:slug'} component={Archive} />
                <Route exact path={CelestialSettings.path + 'post_tag/:slug'} component={Archive} />
                <Route exact path={CelestialSettings.path + 'testing'} component={Testing} />
                <Route component={ NotFound } />
               
            </Switch>
        </div>
        <Footer />
    </div>
);

// Routes
const routes = (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App} />
   </Router>
);

render(
    (routes), document.getElementById('page')
);
