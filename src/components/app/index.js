import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from '../navbar';
import LandingContainer from '../landing-container';
// import ProfileContainer from '../profile-container';
import { signIn, tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Route path='*' component={Navbar} />
          <Route exact path='/' component={LandingContainer} />
          {/* <Route exact path='/user/:profileID' component={ProfileContainer} /> */}
        </section>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  signIn: token => dispatch(signIn(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);