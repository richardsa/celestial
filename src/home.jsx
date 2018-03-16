import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIcon from './loading-icon.gif';
import Placeholder from './placeholder.jpg';

class Home extends React.Component {

    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="posts-title">Welcome Bish!</h1>

                </div>
                <img src={LoadingIcon} alt="loader gif" id="loader" />
            </div>
        );
    }
}

export default Home;
