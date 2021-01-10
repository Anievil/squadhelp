import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Events.module.sass';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Timer from '../../components/Timer/Timer.js'
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup'

const Events = (props) => {
    const {isFetching} = props;
    const [isClicked, setIsClicked] = useState(false)

    localStorage.setItem('givenDate', new Date(2021, 0, 17))
    localStorage.setItem('dateOfStart', new Date(2021, 0, 4))

    const uncheckEvent = () => {
        const givenDate = new Date(localStorage.getItem('givenDate'))
        const currentDate = new Date()

        if(givenDate <= currentDate && isClicked === false){
            console.log(currentDate - givenDate)
            return <div className={styles.redPoint} />
            
        }
    }

    const clicked = () => {
        if(isClicked === false){
            setIsClicked(true)
          
        }
        else{
            setIsClicked(false)
        }
    }

    return (
        <>
            <Header/>
            {isFetching ? <Spinner/> : (<>
                <div className={styles.events}>
                    <ul className={styles.eventsList}>
                        <li onClick={clicked}>
                            { uncheckEvent() }
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg/1200px-VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg.png" /> Log
                        </li>
                        <li> 
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg/1200px-VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg.png" /> Coming soon
                        </li>
                        <li>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg/1200px-VisualEditor_-_Icon_-_Indent-list-ltr_-_white.svg.png" /> Coming soon
                        </li>
                    </ul>
                    { isClicked ? <Timer /> : ''}
                </div>
                    <ButtonGroup textForButton1='text1' textForButton2='text2' textForButton3='text3'/>
                <Footer />
            </>)}
        </>
    )
};

const mapStateToProps = (state) => {
    const {isFetching} = state.userStore;
    return {isFetching};
};

export default connect(mapStateToProps, null)(Events);