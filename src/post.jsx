var _ = require('lodash');

import React from 'react';
import { Link } from 'react-router-dom';
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
        // above scroll to not working
        // using below for now
        // https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing/18573599#18573599
        setTimeout(function () {
            window.scrollTo(0, 0);
        },2);

        var that = this;
        var url = window.location.href.split('/');
        console.log(url);
        var slug = url.pop() || url.pop();
        console.log('post ' + CelestialSettings.URL.api + "/posts?slug=" + slug );
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
    
    renderCategories(categoryList){
        return categoryList.map((category, i) => {
             console.log(category.name);
             return(
               // <Link to={'/wp-json/wp/v2/categories/' + category.term_id} key={i}>{category.name}</Link>  
                <Link to={'/category/' + category.slug } key={i}>{category.name} </Link>   
            )
        });
    }
    
    renderTags(tagList){
        return tagList.map((tag, i) => {
             console.log(tag.name);
             return(
               // <Link to={'/wp-json/wp/v2/categories/' + category.term_id} key={i}>{category.name}</Link>  
                <Link to={'/post_tag/' + tag.slug } key={i}>{tag.name} </Link>   
            )
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
                    {
                        _.isEmpty(this.state.post.pure_taxonomies.categories) ? null : <p className="card-text"><small className="text-muted">Categories: {this.renderCategories(this.state.post.pure_taxonomies.categories)}</small></p> 
                    }
                    
                    {
                        _.isEmpty(this.state.post.pure_taxonomies.tags) ? null : <p className="card-text"><small className="text-muted">Tags: {this.renderTags(this.state.post.pure_taxonomies.tags)}</small></p> 
                    }
                    
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
