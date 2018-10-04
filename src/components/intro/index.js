import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { signUpRequest, signInRequest } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import Modal from '../helpers/modal';
import UserAuthForm from '../userAuth-form';
import { logError, renderIf } from './../../lib/util.js';

class Intro extends React.Component {
  constructor(props){
    super(props);
    this.state = { authFormAction: 'Sign Up', formDisplay: false, };
  }
  handleSignin = (user, errCB) => {
    return this.props.signIn(user)
      .then(() => {
        return this.props.userProfileFetch()
          .catch(err => logError(err));
      })
      .catch(err => {
        logError(err);
        errCB(err);
      });
  };
  handleSignup = (user, errCB) => {
    return this.props.signUp(user)
      .then(() => {
        return this.props.userProfileFetch()
          .catch(err => logError(err));
      })
      .catch(err => {
        logError(err);
        errCB(err);
    });
  };
  render() {
    let handleComplete = this.state.authFormAction === 'Sign Up' ? this.handleSignup : this.handleSignin;
    return (
      <div className="intro">
        <section id="introView" className="view introView">
          <p>
            click the button below to  signup or sign in!
          </p>
          <button className='button' onClick={() => this.setState({formDisplay: true})}id="start-button" >
            START
          </button>
        </section>
        <div>
          {renderIf(this.state.formDisplay,
            <div>
              <Modal heading='Olympic App' close={() => this.setState({ formDisplay: false })}>
                <UserAuthForm authFormAction={this.state.authFormAction} onComplete={handleComplete} />
                <div className='userauth-buttons'>
                  {renderIf(this.state.authFormAction==='Sign In',
                    <button className='formButton darkButton' onClick={() => this.setState({authFormAction: 'Sign Up'})}>Sign Up</button>
                  )}
                  {renderIf(this.state.authFormAction==='Sign Up',
                    <button className='formButton darkButton' onClick={() => this.setState({authFormAction: 'Sign In'})}>Sign In</button>
                  )}
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUpRequest(user)),
    signIn: user => dispatch(signInRequest(user)),
    userProfileFetch: () => dispatch(userProfileFetchRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);