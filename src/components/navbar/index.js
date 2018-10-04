import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUpRequest, signInRequest, signOut } from '../../actions/userAuth-actions.js';
import { userProfileFetchRequest } from '../../actions/userProfile-actions.js';
import UserAuthForm from '../userAuth-form';
import { classToggler, logError, renderIf } from '../../lib/util.js';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state={ showDropDown: false, authFormAction: 'Register' };
  }
  handleSignin = (user, errCB) => {
    return this.props.signIn(user)
      .then(() => {
        return this.props.userProfileFetch()
          .catch(err => logError(err));
      })
      .then(() => {
        return this.setState({ showDropDown: false });
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
      .then(() => {
        return this.setState({ showDropDown: false });
      })
      .catch(err => {
        logError(err);
        errCB(err);
    });
  };
  handleSignOut = () => {
    this.props.signOut();
    this.setState({ showDropDown: false });
    this.props.history.push('/');
  };
  render() {
    let profileLink = this.props.userProfile && this.props.userProfile._id ? `/user/${this.props.userProfile._id}` : '';
    let handleComplete = this.state.authFormAction === 'Register' ? this.handleSignup : this.handleSignin;
    return (
        <header>
          <nav>
          {renderIf(this.props.userAuth && this.state.showDropDown ,
              <div className='grayedoutnav' onClick={() => this.setState({ showDropDown: false })}></div>
            )}
            <div className='navPrimary' onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}>
              <div className={classToggler({
                'navPrimary-toggle': true,
                'ddOpen': this.state.showDropDown,
              })}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={classToggler({
                'darkNavSection': true,
                'darkNavSection-ddOpen': this.state.showDropDown,
                'darkNavSection-auth': this.props.userAuth,
              })}>
                {renderIf(this.props.userAuth && this.state.showDropDown ,
                  <div className='distanceContainer'>
                  <div className='distance'>
                    <p>7,3 km</p>
                  </div>
                  </div>
                )}
                {renderIf(this.props.userAuth,
                  <div className='coins'>
                    <p> 10.63 </p>
                  </div>
                )}
                <img className={classToggler({
                  'navcoinlogo': true,
                  'extrapadding': !this.props.userAuth,
                  })} src='https://i.imgur.com/ey72AKX.png' />
              </div>
            </div>
            {renderIf(this.props.userAuth && this.state.showDropDown ,
              <div className='navPrimary-dropdown'>
                <ul className='navPrimary-menu'>
                  <li className='navPrimary-li'>
                    <Link to='/dashboard' className='navPrimary-li-text' onClick={() => this.setState({ showDropDown: false })}><img src='https://i.imgur.com/OPUUc13.png' className='navIcons dbicon'/> <span>DASHBOARD</span></Link>
                  </li>
                  <li className='navPrimary-li'>
                    <Link to='/map' className='navPrimary-li-text' onClick={() => this.setState({ showDropDown: false })}><img src='https://i.imgur.com/gxfbqpg.png' className='navIcons mapicon'/> <span>MAP</span></Link>
                  </li>
                  <li className='navPrimary-li dc-li'>
                    <Link to='/dailychallenge' className='navPrimary-li-text' onClick={() => this.setState({ showDropDown: false })}><img src='https://i.imgur.com/KgDT2nR.png' className='navIcons dcicon'/> <span>DAILY</span> <br className='break'/> <span className='indentSmall'>CHALLENGE</span></Link>
                  </li>
                  <li className='navPrimary-li'>
                    <Link to='/mywallet' className='navPrimary-li-text' onClick={() => this.setState({ showDropDown: false })}><img src='https://i.imgur.com/Bnd3w7M.png' className='navIcons walleticon'/> <span>MY WALLET</span></Link>
                  </li>
                </ul>
                <p className='button oauthbuttonText lightBlueRev logoutButton' onClick={this.handleSignOut}><span>LOG OUT</span></p>
              </div>
            )}
            {renderIf(!this.props.userAuth,
            <div className='ddContainer'>
              <div className='signInBanner'>
                {renderIf(this.state.authFormAction =='Sign In',
                  <p>Sign in</p>
                )}
                {renderIf(this.state.authFormAction =='Register',
                  <p>Register</p>
                )}
              </div>
              <div className='oauthDiv'>
                <div className='oauthButtonContainer'>
                  <button className='button randomBlue'><img src='https://i.imgur.com/8SuZVDb.png' /><span className='oauthbuttonText'>Sign in with Facebook</span></button>
                </div>
                <div className='oauthButtonContainer'>
                  <button className='button randomGray'><img src='https://i.imgur.com/1oNQY1E.png' /> <span className='oauthbuttonText'>Sign in with Google</span></button>
                </div>
              </div>
              <div className='orLine'>
                <p className='or'>OR</p>
                <p className='underline'> </p>
              </div>
              <div className='navForm-div'>
                <div>
                  <UserAuthForm authFormAction={this.state.authFormAction} onComplete={handleComplete} />
                    <div className='userauth-buttons'>
                      {renderIf(this.state.authFormAction==='Register',
                        <div>
                          <p className='question'>
                            Already have an account?
                          </p>
                        <button className='button oauthbuttonText lightGray' onClick={() => this.setState({authFormAction: 'Sign In'})}>Sign In</button>
                        </div>
                      )}
                      {renderIf(this.state.authFormAction==='Sign In',
                        <div>
                          <p className='question'>
                            Dont't have an account yet?
                          </p>
                          <button className='button oauthbuttonText lightGray' onClick={() => this.setState({authFormAction: 'Register'})}>Registration</button>
                        </div>
                      )}
                    </div>
                </div>
              </div>
              </div>
            )}
          </nav>
        </header>
    );
  }
}

let mapStateToProps = state => ({
  userAuth: state.userAuth,
  userProfile: state.userProfile,
});

let mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(signUpRequest(user)),
  signIn: user => dispatch(signInRequest(user)),
  userProfileFetch: () => dispatch(userProfileFetchRequest()),
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);