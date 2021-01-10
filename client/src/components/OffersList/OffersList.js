import React from 'react'
import {getOffers, getAllUsers, acceptOffer} from '../../actions/actionCreator';
import { connect } from 'react-redux';
import styles from './OffersList.module.sass'
import CreateContest from '../../components/CreateContest/CreateContest'

class OffersList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hiddenContestForm: true
        } 
    }

    close = () => {
        this.props.close()
    }

    componentDidMount = () =>{
        if(!this.props.updateContestStore.data){
            const token = localStorage.getItem('accessToken')
            const objToken = {token}
            console.log(objToken)
            this.props.getOffers(objToken)
        }
        if(this.props.userStore.data.role === 'moderator'){
            const token = localStorage.getItem('accessToken')
            const objToken = {token}
            console.log('moder')
            this.props.getAllUsers(objToken)
        }
    }

    changeStatus = (e, id) => {
        console.log(e.target.value + ' ' + id)
        const token = localStorage.getItem('accessToken')
        const changeStatusObj = {id, status: e.target.value, token}
        console.log(changeStatusObj)
        this.props.acceptOffer(changeStatusObj)
        const objToken = {token}
        this.props.getOffers(objToken)
        console.log(this.props.updateContestStore.data)
    }

    closeContestForm = () => {
        this.setState({
            hiddenContestForm: false
        })
    }

    openContestForm = () => {
        this.setState({
            hiddenContestForm: true
        })
    }

    renderOffersModer = () => {
        const offers = this.props.updateContestStore.data
        const users = this.props.userProfile.data
        console.log(users) 
        return (<>
            { users.map((user) => (
                <>
                    { user.role === 'creator' ?
                        <div key={user.id} className={styles.offerCreatorCont}>
                            <h2 className={styles.userInfoText}>User first name: {user.firstName}</h2>
                            <h2 className={styles.userInfoText}>User last name: {user.lastName}</h2>
                            <h2 className={styles.userInfoText}>Email: {user.email}</h2>
                            { offers.map((offer) => (
                                <>
                                    {offer.userId === user.id ? 
                                    <div key={offer.id} className={styles.offerCard}>
                                        <p>Description: {offer.text}</p>
                                        <p>Name: {offer.fileName}</p>
                                        <p>Original name: {offer.originalFileName}</p>
                                        <p>Status: {offer.status}</p>
                                        {offer.status == 'pending' ? <>
                                            <button value='accept' onClick={(e) => this.changeStatus(e, offer.id)}>Accept</button>
                                            <button value='reject' onClick={(e) => this.changeStatus(e, offer.id)}>Reject</button>
                                </> : ''}
                            </div> : ''}</>    
                            )) }
                        </div>: 
                    ''}       
                </>
            ))}
        </>)        
    }
    

    renderOffersUser = () => {
        const offers = this.props.updateContestStore.data
        return (
            <>  
                <h2 className={styles.userInfoText}>Your offers</h2> 
                {offers.map((offer) => (   
                    <div key={offer.id} className={styles.offerCard}>
                        <p>Description: {offer.text}</p>
                        <p>Name: {offer.fileName}</p>
                        <p>Original name: {offer.originalFileName}</p>
                        <p>Status: {offer.status}</p>
                        {offer.status === 'accept' ?  <button onClick={this.closeContestForm} >Create new contest</button> : ''}
                    </div>         
                ))} 
            </>
        )
    }

    render(){
        const {hiddenContestForm} = this.state
        return (<>
            <div className={styles.offerList}>
                { this.props.updateContestStore.data != null && this.props.userProfile.data != null && this.props.userStore.data.role === 'moderator' ? this.renderOffersModer() : ''}
                { this.props.updateContestStore.data != null && this.props.userStore.data.role != 'moderator' ? this.renderOffersUser() : ''}
                <button onClick={this.close}>Close</button>
            </div>
            { !hiddenContestForm ? <CreateContest close={this.openContestForm}/> : ''}
        </>)
    }
}

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOffers: (data) => dispatch(getOffers(data)),
        getAllUsers: (data) => dispatch(getAllUsers(data)),
        acceptOffer: (data) => dispatch(acceptOffer(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
  
  