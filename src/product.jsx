var _ = require('lodash');

import React from 'react';
import NotFound from './not-found';
import { Link } from 'react-router-dom';
import LoadingIcon from './loading-icon.gif';

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        // above scroll to not working
        // using below for now
        // https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing/18573599#18573599
        setTimeout(function () {
            window.scrollTo(0, 0);
        },2);
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.woo.url + "products?slug=" + slug + "&consumer_key=" + CelestialSettings.woo.consumer_key + "&consumer_secret=" + CelestialSettings.woo.consumer_secret)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
             
                return response.json();
            })
            .then(function (res) {
                that.setState({ product: res[0] })
            });
    }

    renderProduct() {
        return (
            <div className="col-md-12 card-outer fade-in">
            <div className="card">
                <div className="card-body">
                    <div className="col-sm-4"><img className="product-image" src={this.state.product.images ? this.state.product.images[0].src : null} alt={this.state.product.images ? this.state.product.images[0].alt : null } /></div>
                    <div className="col-sm-8">
                        <h4 className="card-title">{this.state.product.name}</h4>
                        <p className="card-text"><strike>${this.state.product.regular_price}</strike> <u>${this.state.product.sale_price}</u></p>
                        <p className="card-text"><small className="text-muted">{this.state.product.stock_quantity} in stock</small></p>
                        <p className="card-text">{jQuery(this.state.product.description).text()}</p>
                    </div>
                </div>
                 
            </div>
            <div className="card-text" className='back-to-list'><Link to='/products'>Return to product list</Link></div>
            </div>
        );
    }

    renderEmpty() {
        return (
            <NotFound />
        );
    }

    render() {
        console.log('this.state.product',this.state.product);
        if (_.isEmpty(this.state.product)){
           return (
                <div>
                    <img src={LoadingIcon} alt="loader gif" id="loader" />
                </div>
            );
        } 
        return (
            <div className="container post-entry">
                {this.state.product ?
                    this.renderProduct() :
                    this.renderEmpty()
                }
            </div>
        );
    }
}

export default Product;
