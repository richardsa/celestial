var _ = require('lodash');
import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './post-list';
import NotFound from './not-found';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Archive extends React.Component {

    constructor(props) {
        super(props);
        this.getPosts = this.getPosts.bind(this);
        this.state = {
            archivesType: '',
            posts: [],
            page: 1,
            getPosts: true,
            controller: false,
            notFound: false
        }
        this.getPosts = this.getPosts.bind(this);
    }

    componentWillUnmount() {
        this.getPosts = null;
    }

    componentDidMount() {
        var that = this;
        
        that.getPosts();
        window.onbeforeunload = function () { window.scrollTo(0, 0); }
        // above scroll to not working
        // using below for now
        // https://stackoverflow.com/questions/1174863/javascript-scrollto-method-does-nothing/18573599#18573599
        setTimeout(function () {
            window.scrollTo(0, 0);
        },2);

        // init ScrollMagic Controller
        that.state.controller = new ScrollMagic.Controller();

        // build scene
        var scene = new ScrollMagic.Scene({ triggerElement: "#colophon", triggerHook: "onEnter" })
            .addTo(that.state.controller)
            .on("enter", function (e) {
                if (that.state.getPosts && that.getPosts !== null) {
                    that.getPosts();
                }
            });
    }
    
    renderEmpty() {
        return (
            <div id="content">
        <div className="container post-entry">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">404 Page Not Found!</h4>
                    <p className="card-text">The page you requested does not exist.</p>
                    <p className="card-text"><Link to={CelestialSettings.path}>Return to homepage</Link></p>
                </div>
            </div>
        </div>
    </div>
        )
    }
    
    renderLoading(){
        return (
            <div>
                    <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div> 
        )
    }

    renderPosts(){
        return (
            <div>
              <div className="container">
                  <h1 className="posts-title">Archive for: {this.state.archivesType}</h1>
                  <PostList posts={this.state.posts} />
              </div>
              <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div>        
        )
    }

    getPosts() {
        var that = this;
        var totalPages;
       
        jQuery("#loader").addClass("active");
      
        var currentPage = this.state.page;
        var url = window.location.href.split('/');
        var slug = url.pop();
        var taxonomy = url.pop();
        this.setState({ archivesType: "'" + slug + "'" });
        console.log('archives.jsx api request url: ' + CelestialSettings.URL.api + "/posts?filter[taxonomy]=" + taxonomy + "&filter[term]=" + slug + "&page=" + currentPage);
        fetch(CelestialSettings.URL.api + "/posts?filter[taxonomy]=" + taxonomy + "&filter[term]=" + slug + "&page=" +  currentPage)
            .then(function (response) {
                
                for (var pair of response.headers.entries()) {
                    if (pair[0] == 'x-wp-totalpages') {
                        totalPages = pair[1];
                    } 

                    if (that.state.page >= totalPages) {
                        that.setState({ getPosts: false })
                    }
                }
                
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (results) {
                if (_.isEmpty(results)) {
                    that.setState({ notFound: true });
                 } else {
                    var allPosts = that.state.posts.slice();
                
                results.forEach(function (single) {
                    allPosts.push(single);
                })
                that.setState({ posts: allPosts });     
                 }
                
                
                // removing the loader
                jQuery("#loader").removeClass("active");
                
                // increment page number
                that.setState({ page: that.state.page + 1 });

            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                jQuery("#loader").remove();
            });
    }

    componentDidUpdate() {
        var FadeInController = new ScrollMagic.Controller();
        jQuery('.posts-container .col-md-4.card-outer').each(function () {

            // build a scene
            var FadeInScene = new ScrollMagic.Scene({
                triggerElement: this.children[0],
                reverse: false,
                triggerHook: 1
            })
                .setClassToggle(this, 'fade-in')
                .addTo(FadeInController);
        });
    }

    render() {
        if (this.state.posts.length == 0 && !this.state.notFound) {
            return (
                <div>
                    <img src={LoadingIcon} alt="loader gif" id="loader" />
                </div>
            )
        } 
        return (
            <div>
            {
              this.state.notFound ? this.renderEmpty() : this.renderPosts()
            }
            </div>
        );
    }
}

export default Archive;
