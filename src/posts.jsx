import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './post-list';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.getPosts = this.getPosts.bind(this);
        this.state = {
            posts: [],
            page: 1,
            getPosts: true,
            controller: false
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

    getPosts() {
        var that = this;
        var totalPages;
        // state.page loading previous iteration
        // lookinto but for now use local variable
         var currentPage = this.state.page;
        // adding a loader
        jQuery("#loader").addClass("active");
        
        console.log('posts.jsx api request: ' + CelestialSettings.URL.api + "/posts/?page=" + currentPage )
        fetch(CelestialSettings.URL.api + "/posts/?page=" + currentPage)
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
                var allPosts = that.state.posts.slice();
                results.forEach(function (single) {
                    allPosts.push(single);
                })
                that.setState({ posts: allPosts });

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
        if (this.state.posts.length == 0) {
            return (
                <div>
                    <img src={LoadingIcon} alt="loader gif" id="loader" />
                </div>
            )
        }
        return (
            <div id="post-list">
                <div className="container">
                    <h1 className="posts-title">Posts</h1>
                    <PostList posts={this.state.posts} />
                </div>
                <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div>
        );
    }
}

export default Posts;
