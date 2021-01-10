import React, {useState} from 'react'
import { connect } from 'react-redux';
import { addNewContest } from '../../actions/actionCreator';
import styles from './CreateContest.module.sass'
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import Error from '../../components/Error/Error';
import CONSTANTS from '../../constants';
import RoleInput from '../RoleInput/RoleInput';


function CreateContest({close, ...props}) {
    const clicked = (values) => {
        const token = localStorage.getItem('accessToken')
        values.token = token
        console.log(values)
        props.contestRequest(values)
        closeForm()
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
        <div className={styles.OfferForm} >
            <div className={ styles.loginForm }>
            { error && <Error data={ error.data } status={ error.status }
                          clearError={ authClear }/> }
                <form onSubmit={ handleSubmit(clicked) }>
                    <Field
                        name='originalFileName'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Original file name for offer'
                    />
                    <Field
                        name='title'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Title'
                    />
                    <Field
                        name='typeOfName'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Type of name'
                    />
                    <Field
                        name='industry'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Industry'
                    />
                    <Field
                        name='focusOfWork'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Focus of work'
                    />
                    <Field
                        name='targetCustomer'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Target customer'
                    />
                    <Field
                        name='styleName'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Style name'
                    />
                    <Field
                        name='nameVenture'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Name venture'
                    />
                    <Field
                        name='typeOfTagline'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Type of tagline'
                    />
                    <Field
                        name='brandStyle'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Brand style'
                    />
                    <Field
                        name='createdAt'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Created at'
                    />
                    <Field
                        name='status'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='text'
                        label='Status'
                    />
                    <Field
                        name='prize'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='decimal'
                        label='Prize(ex 5.2)'
                    />
                    <Field
                        name='priority'
                        classes={ formInputClasses }
                        component={ FormInput }
                        type='integer'
                        label='Priority(1-10)'
                    />
                    <div className={ styles.choseRoleContainer }>
                        <Field name='contestType' type='radio' value={ CONSTANTS.NAME_CONTEST }
                            strRole='Contest type name'
                            infoRole='Some text'
                            component={ RoleInput } id={ CONSTANTS.NAME }/>
                        <Field name='contestType' type='radio' value={ CONSTANTS.TAGLINE_CONTEST }
                            strRole='Contest type tagline'
                            infoRole='Some text'
                            component={ RoleInput } id={ CONSTANTS.TAGLINE }/>
                        <Field name='contestType' type='radio' value={ CONSTANTS.LOGO_CONTEST }
                            strRole='Contest type logo'
                            infoRole='Some text'
                            component={ RoleInput } id={ CONSTANTS.LOGO }/>
                    </div>
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
      contestRequest: (data) => dispatch(addNewContest(data)),
    }
);
  
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'addNewContest',
    validate: customValidator(Schems.AddNewContestShcem),
})(CreateContest));