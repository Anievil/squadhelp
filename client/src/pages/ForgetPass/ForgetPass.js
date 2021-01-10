import React from 'react';
import Logo from '../../components/Logo';
import styles from './ForgetPass.module.sass';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import PassRecovery from '../../components/PassRecovery/PassRecovery'

const ForgetPass = (props) => {
  props.clearError();

  return (
  <div className={ styles.mainContainer }>
    <div className={ styles.loginContainer }>
      <div className={ styles.headerSigninPage }>
        <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` } alt="logo"/>
        <div className={ styles.linkLoginContainer }>
          <Link to='/login'
                style={ {textDecoration: 'none'} }><span>Login</span></Link>
        </div>
      </div>
      <div className={ styles.passRecoverContainer }>
        <PassRecovery />
      </div>
    </div>
  </div>);
    
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(ForgetPass);