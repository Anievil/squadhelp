import React from 'react'
import styles from './Timer.module.sass'
import Progress from '../ProgressBar/ProgressBar'

class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { seconds: null, timerCont: null, time: {}, count: null};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    
      secondsToTime(secs){
        const day = Math.floor(secs / 86400); 
        
        const divisorForHours = secs % (60 * 60 * 24);
        const hours = Math.floor(divisorForHours / 60 / 60);
        
        const divisorForMinutes = secs % (60 * 60);
        const minutes = Math.floor(divisorForMinutes / 60);
    
        const divisorForSeconds = divisorForMinutes % 60;
        const seconds = Math.ceil(divisorForSeconds);
    
        let obj = {
          "d": day,
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        const currentDate = new Date()
        const givenDate = new Date(localStorage.getItem('givenDate'))
        const dateOfStart = new Date(localStorage.getItem('dateOfStart'))

        const timerCount = (givenDate - currentDate) / 1000

        this.secondsToTime(timerCount)
        this.setState({ seconds: timerCount , timerCont: (givenDate - dateOfStart) / 1000})
      }
    
      startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
          count: 100 - (100 * seconds / this.state.timerCont)
        });
        localStorage.setItem('count', this.state.count)
        if (seconds == 0) { 
          clearInterval(this.timer);
        }
      }
  
      render() {
        return (
          <div className={styles.loadCont}> 
          {this.startTimer()}
            <h2>Live upcomming checks</h2>
            <hr />
            {/* <div className={styles.loadElem}>       */}
              <p className={styles.timerDate}>days: {this.state.time.d} hours: {this.state.time.h} minutes: {this.state.time.m} seconds: {this.state.time.s}</p>
              <Progress currentStep={this.state.count /   10} />
            {/* </div> */}
          </div>
        ) 
      }
    }

    export default Timer
