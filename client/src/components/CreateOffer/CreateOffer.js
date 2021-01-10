import React from 'react'
import { connect } from 'react-redux';
import { addNewOffer } from '../../actions/actionCreator';
import styles from './CreateOffer.module.sass'
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import Error from '../../components/Error/Error';

function CreateOffer({close, ...props}) {
    const clicked = (values) => {
        console.log(values)
        const accessToken = localStorage.getItem('accessToken')
        values.token = accessToken
        console.log(values)
        props.offerRequest(values)
    }

    const closeForm = () =>{
      close()
    }

    const formInputClasses = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
        notValid: styles.notValid,
        valid: styles.valid,
      };

    const {error, isFetching} = props.auth;
    const {handleSubmit, submitting, authClear} = props;
    return (
      <div className={styles.OfferForm}>
        <div className={ styles.loginForm }>
          { error && <Error data={ error.data } status={ error.status }
            clearError={ authClear }/> }
          <form onSubmit={ handleSubmit(clicked) }>
            <Field
              name='text'
              classes={ formInputClasses }
              component={ FormInput }
              type='text'
              label='Description'
            />
            <Field
              name='fileName'
              classes={ formInputClasses }
              component={ FormInput }
              type='text'
              label='Name of project'
            />
            <Field
              name='originalFileName'
              classes={ formInputClasses }
              component={ FormInput }
              type='text'
              label='Originale name of project'
            />
            <button type='submit' disabled={ submitting }
              className={ styles.submitContainer }>
              <span className={ styles.inscription }>{ isFetching
                ? 'Submitting...'
                : 'SEND' }</span>
            </button>
          </form>
          <button onClick={closeForm} className={ styles.submitContainer }><span className={ styles.inscription }>CLOSE</span></button>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
    const {auth} = state;
    return {auth};
};
  
const mapDispatchToProps = (dispatch) => (
    {
      offerRequest: (data) => dispatch(addNewOffer(data)),
    }
);
  
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'addNewOffer',
    validate: customValidator(Schems.AddNewOfferSchem),
})(CreateOffer));