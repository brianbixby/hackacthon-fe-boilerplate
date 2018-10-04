import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { tokenSignInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest, userProfileUpdateRequest } from '../../actions/userProfile-actions.js';
import Intro from '../intro';
import UserProfileForm from '../userProfile-form';
import Modal from '../helpers/modal';
import { userValidation, logError, renderIf } from './../../lib/util.js';

class LandingContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { profileFormDisplay: true }
  }
  componentWillMount() {
    userValidation(this.props);
  }
  handleProfileUpdate = profile => {
    return this.props.userProfileUpdate(profile)
      .catch(logError);
  };
  
  render() {
    let profileAction ='create';
    return (
      <section className='landingContainer container-outer'>
        {renderIf(!this.props.userAuth,
            <Intro />
        )}
        {renderIf(this.props.userAuth,
          <div>
            <p> Logged in! </p>
            {renderIf(this.state.profileFormDisplay && this.props.userProfile && this.props.userProfile.lastLogin === this.props.userProfile.createdOn,
              <Modal heading='Create Profile' close={() => { this.setState({ profileFormDisplay: false }); this.handleProfileUpdate(this.props.userProfile); }}>
                <UserProfileForm userProfile={this.props.userProfile} onComplete={this.handleProfileUpdate} profileAction={profileAction} />
              </Modal>
            )}
          </div>
        )}
      </section>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  tokenSignIn: token => dispatch(tokenSignInRequest(token)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  userProfileUpdate: profile => dispatch(userProfileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);