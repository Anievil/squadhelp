import * as yup from 'yup';
import valid from 'card-validator';



export default {
    AddNewContestShcem: yup.object().shape({
        originalFileName: yup.string().required('Email is required'),
        title: yup.string().required('Email is required'),
        typeOfName: yup.string().required('This field is required'),
        industry: yup.string().required('This field is required'),
        focusOfWork: yup.string().required('This field is required'),
        targetCustomer: yup.string().required('This field is required'),
        styleName: yup.string().required('This field is required'),
        nameVenture: yup.string().required('This field is required'),
        typeOfTagline: yup.string().required('This field is required'),
        brandStyle: yup.string().required('This field is required'),
        createdAt: yup.string().required('This field is required'),
        status: yup.string().required('This field is required'),
        prize: yup.number().required('This field is required'),
        priority: yup.number().integer().min(0).max(10).required('This field is required'),
        contestType: yup.string().matches(/(name|tagline|logo)/).required('Contest type is required'),
    }),
    AddNewOfferSchem: yup.object().shape({
        text: yup.string().required('Description is required'),
        fileName: yup.string().required('File name is required'),
        originalFileName: yup.string().required('Original file name is required'),
    }),
    RecoverySchem: yup.object().shape({
        email: yup.string().email('check email').required('required'),
        password: yup.string().test('test-password','min 6 symbols',value => (value && value.trim().length>=6)).required('required')
    }),
    LoginSchem: yup.object().shape({
        email: yup.string().email('check email').required('required'),
        password: yup.string().test('test-password','min 6 symbols',value => (value && value.trim().length>=6)).required('required')
    }),
    RegistrationSchem: yup.object().shape({
        email: yup.string().email('check email').required('Email is required'),
        password: yup.string().test('test-password','min 6 symbols',value => (value && value.trim().length>=6)).required('required'),
        confirmPassword: yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirmation pass must match password'),
        firstName: yup.string().test('test-firstName','required',value => (value && value.trim().length>=1)).required('First Name is required'),
        lastName: yup.string().test('test-lastName','required',value => (value && value.trim().length>=1)).required('Last Name is required'),
        displayName: yup.string().test('test-displayName','required',value => (value && value.trim().length>=1)).required('Display Name is required'),
        role: yup.string().matches(/(customer|creator|moderator)/).required('Role is required'),
        agreeOfTerms: yup.boolean().oneOf([true],'Must Accept Terms and Conditions').required('Must Accept Terms and Conditions')
    }),
    ContestSchem: yup.object().shape({
        contestType: yup.string().matches(/(name|tagline|logo)/).required(),
        file: yup.mixed(),
        title: yup.string().test('test-title','required',value => (value && value.trim().length>=1)).required('title of contest required'),
        typeOfName: yup.string(),
        industry: yup.string().required('industry required'),
        focusOfWork: yup.string().test('test-focusOfWork','required',value => (value && value.trim().length>=1)).required('focus of work required'),
        targetCustomer: yup.string().test('test-targetCustomer','required',value => (value && value.trim().length>=1)).required('target customers required'),
        styleName: yup.string(),
        nameVenture: yup.string(),
        typeOfTagline: yup.string(),
        brandStyle: yup.string()
    }),
    filterSchem: yup.object().shape({
        typeIndex: yup.number().oneOf[1, 2, 3, 4, 5, 6, 7],
        contestId: yup.string(),
        awardSort: yup.string().matches(/(desc|asc)/),
        industry: yup.string()
    }),
    LogoOfferSchema: yup.object().shape({
        offerData: yup.mixed().required('required')
    }),
    TextOfferSchema: yup.object().shape({
        offerData: yup.string().test('test-offerData','required',value => (value && value.trim().length>=1)).required('suggestion is required')
    }),
    PaymentSchema: yup.object().shape({
        number: yup.string().test('test-cardNumber','Credit Card number is invalid',value => valid.number(value).isValid).required('required'),
        name: yup.string().min(1,'required atleast one symbol').required('required'),
        cvc: yup.string().test('test-cvc','cvc is invalid',value => valid.cvv(value).isValid).required('required'),
        expiry: yup.string().test('test-expiry','expiry is invalid',value=>valid.expirationDate(value).isValid).required('required')
    }),
    CashoutSchema: yup.object().shape({
        sum: yup.number().min(5,'min sum is 5$').required('required'),
        number: yup.string().test('test-cardNumber','Credit Card number is invalid',value => valid.number(value).isValid).required('required'),
        name: yup.string().min(1).required('required'),
        cvc: yup.string().test('test-cvc','cvc is invalid',value => valid.cvv(value).isValid).required('required'),
        expiry: yup.string().test('test-expiry','expiry is invalid',value=>valid.expirationDate(value).isValid).required('required')
    }),
    UpdateUserSchema: yup.object().shape({
        firstName: yup.string().test('test-firstName','required',value => (value && value.trim().length>=1)).required('required'),
        lastName: yup.string().test('test-lastName','required',value => (value && value.trim().length>=1)).required('required'),
        displayName: yup.string().test('test-displayName','required',value => (value && value.trim().length>=1)).required('required'),
        file: yup.mixed()
    })
}
