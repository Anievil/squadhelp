import React, { Component } from 'react'
import {getContests} from '../../actions/actionCreator';
import { connect } from 'react-redux';
import styles from './ContestsList.module.sass'

class ContestsList extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        if(!this.props.contestStore.data){
            const token = localStorage.getItem('accessToken')
            const objToken = {token}
            console.log(objToken)
            this.props.getContests(objToken)
        }
    }

    renderContests = () => {
        const contests = this.props.contestStore.data
        return (
            <>  
                {contests.map((contest) => (   
                    <div key={contest.id} className={styles.offerCard}>
                        <h2>{contest.title}</h2>
                        <p>Contest type: {contest.contestType}</p>
                        <p>File name: {contest.fileName}</p>
                        <p>Original file name: {contest.originalFileName}</p>
                        <p>Type of name: {contest.typeOfName}</p>
                        <p>Industry: {contest.industry}</p>
                        <p>Focus of work: {contest.focusOfWork}</p>
                        <p>Target customer: {contest.targetCustomer}</p>
                        <p>Style name: {contest.styleName}</p>
                        <p>Name venture: {contest.nameVenture}</p>
                        <p>Type of tagline: {contest.typeOfTagline}</p>
                        <p>Brand style: {contest.brandStyle}</p>
                        <p>Created at: {contest.createdAt}</p>
                        <p>Status: {contest.status}</p>
                        <p>Prize: {contest.prize}</p>
                        <p>Priority: {contest.priority}</p>
                    </div>         
                ))} 
            </>
        )
    }

    render(){
        return (
         <>
            { this.props.contestStore.data != null ? this.renderContests() : '' }
         </>
    )
    }
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        getContests: (data) => dispatch(getContests(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestsList);
