import React, {useState} from 'react';
import styles from './Error.module.sass';
import fs from 'jsonfile';

const Error=props=>{

    const [code, setCode] = useState(null)
    const [status, setStatus] = useState(null)

    const getMessage=()=>{
        const {status,data}=props;
        console.log(props)
        switch (status) {
            case 404:
                return data;
            case 400:
                return 'Check the input data';
            case 409:
                return data;
            case 403:
                return 'Bank decline transaction';
            case 406:
                return data;
            default:
                return 'Server Error';
        }
    };

    // const customError = () =>{
    //     if(Error.captuerStackTrace){
    //         Error.captuerStackTrace(this, customError)
    //     }
    //     setCode(code)
    //     setStatus(status)
    //     console.log(code + ' ' + status)
    // }   

    // const errorLogger = () =>{
    //     // console.log('ok')
    //     const {status} = props
    //     // debugger;
    //     const file = './error.json'
    //     const obj = {date: `${new Date}`, log: `${status}`}
    //     // console.log(obj)
    //     fs.writeFile(file, obj)
    //         .then(() => {
    //             console.log('Write complete')
    //         })
    //         .catch(error => console.error(error))
    //     // console.log('ok')
    // }

    const {clearError}=props;
    // customError()
    //  errorLogger()
   console.log(props)
    return(
        <div className={styles.errorContainer}>
            <span>
                {getMessage()}
            </span>

            <i className="far fa-times-circle" onClick={()=>clearError()}/>
        </div>
    )
};

export default Error;