import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorks.module.sass';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import steps from './Steps.json'
import questions from './AskedQuestions.json'
import ReactHtmlParser from 'react-html-parser'

const HowItWorks = (props) => {
    const {isFetching} = props;

    const showSteps = () => {
        return steps.map((step) => {
            return(
                <div className={styles.step}>
                    <div className={styles.stepNum}>
                        <p>{step.num}</p>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                </div>
            )
        })
    }

    const showAskedQuestions = () => {
        return questions.map((question) => {
            return(
                <div className={styles.question}>
                    <h3>{question.question}</h3>
                    {ReactHtmlParser(question.answer)}
                </div>
            )
        })
    }

    return (
        <>
            <Header/>
            {isFetching ? <Spinner/> : (<>
                <div className={styles.mainInfo}>
                    <div className={styles.video}>
                        <p>Video</p>
                    </div>
                    <div>
                        <h2>How Does Squadhelp Work?</h2>
                        <p>Squadhelp allows you to host branding competitions to engage with the most creative 
                            people across the globe and get high-quality results, fast. Thousands of creatives 
                            compete with each other, suggesting great name ideas. At the end of the collaborative 
                            contest, you select one winner. The winner gets paid, and you get a strong brand name that 
                            will help you succeed! It's quick, simple, and costs a fraction of an agency.</p>
                    </div>
                </div>

                <div className={styles.stepsCont}>
                    <h2>5 Simple Steps</h2>
                    <div className={styles.steps}>
                        {showSteps()}
                    </div>
                </div>

                <div className={styles.buttonCont}>
                    <button>START A CONTEST</button>
                </div>

                <div className={styles.questions}> 
                    <div className={styles.questionsHeader}>
                        <img />
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <hr />
                    <div className={styles.questionsCont}>
                        {showAskedQuestions()}
                    </div>
                </div>

                <div className={styles.feedback}>
                    <div className={styles.messageIcon}>
                        <img src='https://cdn3.iconfinder.com/data/icons/user-interface-glyph-3/32/message-512.png' alt='message'/>
                    </div>
                    <div > 
                        <h2>Questions?</h2>
                        <p>Check out our FAQs or send us a message. For assistance with launching a contest, 
                            you can also call us at (877) 355-3585 or schedule a Branding Consultation</p>
                    </div>
                    <button>GET IN TOUCH</button>
                </div>
                <Footer />
            </>)}
        </>
    )
};

const mapStateToProps = (state) => {
    const {isFetching} = state.userStore;
    return {isFetching};
};

export default connect(mapStateToProps, null)(HowItWorks);