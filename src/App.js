import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PostDetails from './components/PostDetails';

class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className="col-md-10 col-md-offset-1">
          <Route exact path="/" component={Home}  />
          <Route path="/:category/:id" component={PostDetails} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
