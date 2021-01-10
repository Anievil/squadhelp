import React from 'react';
import { connect } from 'react-redux';
import { authActionPassRecovery, clearAuth } from '../../actions/actionCreator';
import { Redirect } from 'react-router-dom';
import styles from './PassRecovery.module.sass';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import Error from '../../components/Error/Error';

class PassRecovery extends React.Component{

  componentWillUnmount () {
    this.props.authClear();
  }

  clicked = (values) => {
    localStorage.setItem('email', values.email)
    this.props.recoveryRequest(values);
  };

  render () {
    const {error, isFetching} = this.props.auth;
    const {handleSubmit, submitting, authClear} = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={ styles.loginForm }>
        { error && <Error data={ error.data } status={ error.status }
                          clearError={ authClear }/> }
        <h2>ENTER YOUR E-MAIL ADDRESS</h2>
        <form onSubmit={ handleSubmit(this.clicked) }>
          <Field
            name='email'
            classes={ formInputClasses }
            component={ FormInput }
            type='text'
            label='Email Address'
          />
          <Field
            name='password'
            classes={ formInputClasses }
            component={ FormInput }
            type='password'
            label='New password'
          />
          <button type='submit' disabled={ submitting }
                  className={ styles.submitContainer }>
            <span className={ styles.inscription }>{ isFetching
              ? 'Submitting...'
              : 'RESTORE' }</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {auth} = state;
  return {auth};
};

const mapDispatchToProps = (dispatch) => (
  {
    recoveryRequest: (data) => dispatch(authActionPassRecovery(data)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'restore',
  validate: customValidator(Schems.RecoverySchem),
})(PassRecovery));