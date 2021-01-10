import React from 'react';
import { useLocation } from 'react-router-dom'
import history from '../../browserHistory';
import { connect } from 'react-redux';
import { updatePass } from '../../actions/actionCreator';


function UpdatePass(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const {pathname} = useLocation()
    const lenght = pathname.length
    const hashPass = pathname.slice(12, lenght+1)
    const email = localStorage.getItem('email');
    const data = {email, hashPass}
    localStorage.removeItem('email')
    props.updatePassRequest(data)
    history.replace('/');
    return (<></>);
}

const mapDispatchToProps = (dispatch) => (
    {
      updatePassRequest: (data) => dispatch(updatePass(data)),
    }
);
  
export default connect(null, mapDispatchToProps)(UpdatePass)