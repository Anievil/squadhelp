import React from 'react';
import styles from './ProgressBar.module.sass';


const ProgressBar = (props) => {
    const renderProgress = () => {
        const array = [];
        for (let i = 1; i <= 10; i++) {
            array.push(renderBar(i));
        }
        return array;
    };

    const renderBar = (count) => {
        const currentStep = props.currentStep;
        let classOuter = styles.outerNotActive;
        let classInner = styles.innerNotActive;
        let classProgress = '';
        if (count === currentStep) {
            classOuter = styles.outerActive;
            classInner = styles.innerActive;
            classProgress = styles.progressContainer;
        }
        if (count < currentStep) {
            classOuter = styles.outerComplete;
            classInner = styles.innerComplete;
        }
        return (
            <div className={classProgress, styles.progress} key={count}>
                <div className={styles.progressBarContainer}>
                    <div className={classOuter}>
                        <div className={classInner}></div>
                    </div>
                    {/* {count !== 10 && <div className={styles.lineBar}></div>} */}
                </div>
            </div>
        )
    };

    const timerCount = localStorage.getItem('count')

    return (
        <div className={styles.progressBarContainer}>
            {renderProgress()}
            <progress className={styles.lineBar} value={timerCount} max="100"></progress>
        </div>
    );
};
export default ProgressBar;