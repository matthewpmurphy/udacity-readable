import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PostDetails from './components/PostDetails';

class App extends Component {
  /**
    * @description render the applicatino
    * @return sets up the framework of the application, returns the navbar and the 2 routes within the app
  **/
  render() {
    return (
      <div>
        <NavBar />
        <div className="col-md-12">
          <Route exact path="/" component={Home}  />
          <Route path="/:category/:id" component={PostDetails} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
