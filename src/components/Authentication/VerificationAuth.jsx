import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom';
const VerificationAuth = (props) => {
    const history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem("access_token")){
            history.push('/login');
        }
    }, [history])
    return (
        <>
            {props.children}
        </>
    )
}

export default VerificationAuth;
