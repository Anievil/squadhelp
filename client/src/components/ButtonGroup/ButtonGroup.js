import React from 'react'
import styles from './ButtonGroup.module.sass'

export default function ButtonGroup(props) {
    const buttonElements = props;

    const buttonValues = Object.values(buttonElements)
    const buttonBlocks = []
    for(let i= 0; buttonValues.length > i; i++)
    buttonBlocks.push(<div key={i} tabIndex='0' className={styles.button}>{buttonValues[i]}</div>) 

    return (
        <div className={styles.buttonCont}> {buttonBlocks} </div>
    )
}
  