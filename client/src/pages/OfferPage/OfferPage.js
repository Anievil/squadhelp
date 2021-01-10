import React, { useState} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './OfferPage.module.sass';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import CreateOffer from '../../components/CreateOffer/CreateOffer'
import OffersList from '../../components/OffersList/OffersList'
import ContestsList from '../../components/ContestsList/ContestsList'

const OfferPage = (props) => {
    const [hiddenOfferForm, setHiddenOfferForm] = useState(true)
    const [hiddenOfferList, setHiddenOfferList] = useState(true)
    const {isFetching} = props.userStore;

    return (
        <>
            <Header/>
            {isFetching ? <Spinner/> : (<>
                <div className={styles.offerPage}>  
                    { props.userStore.data.role === 'creator' ? <div onClick={() =>{setHiddenOfferForm(false)}} className={styles.startContestBtn}>CREATE NEW OFFER</div> : ''}
                    { props.userStore.data.role != 'customer' ? <div onClick={() =>{setHiddenOfferList(false)}} className={styles.startContestBtn}>START CONTEST</div> : ''}
                    { !hiddenOfferForm ? <CreateOffer close={() =>{setHiddenOfferForm(true)}}/> : ''}
                    {!hiddenOfferList ? <OffersList close={() =>{setHiddenOfferList(true)}}/> : ''}
                    <div className={styles.listOfContests}>  
                        <ContestsList />
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, null)(OfferPage);