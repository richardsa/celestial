var _ = require('lodash');

import React from 'react';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';


class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        var that = this;
        var url = window.location.href.split('/');
        var slug = url.pop() || url.pop();

        fetch(CelestialSettings.URL.api + "/posts?slug=" + slug)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (res) {
                that.setState({ post: res[0] })
            });
    }

    renderPosts() {
          if (_.isEmpty(this.state.post)) {
        return (
            <div>
            {
                this.renderLoading()
                
            }
            </div>
            
        ) 
               
          }
        return (
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.state.post.title.rendered}</h4>
                    <p className="card-text"><small className="text-muted">{this.state.post.author_name} &ndash; {this.state.post.published_date}</small></p>
                    {
                        this.state.post.featured_image_src ? <img className="featured-image center-block" src={this.state.post.featured_image_src} alt="featured image" /> : null
                    }
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }}  />
                </div>
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
            <div className="container post-entry">
                { 
                   this.state.post != undefined ?
                   this.renderPosts() :
                   this.renderEmpty()
                }
            </div>
        );
    }
}

export default Post;
