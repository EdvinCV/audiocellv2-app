import React, {useEffect} from 'react';
import LoginForm from './LoginForm';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../Redux/actions/loginActions';
import {useHistory} from 'react-router-dom';
import './login.css';
import logo from './audiocell.png';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (values) => {
        dispatch(loginUser(values));   
    }

    const authenticated = useSelector((state) => state.authentication.authenticated);

    useEffect(() => {
        if(authenticated){
            history.push('/home');
        }
    }, [authenticated, history]);

    return (
        <div className='log-container'>
            <div className='image-container'>
                <img className="card-img-top" src={logo} alt="Audiocell" style={{width:"90%", margin:"0 auto", borderRadius: "20px"}}/>
            </div>
            <div className='login-container'>
                <div className='form-container'>
                    <h3>Inicio de Sesión</h3>
                    <br />
                    <hr />
                    <br />
                    <LoginForm onSubmit={handleLogin} />
                </div>
            </div>
        </div>
    );
}

export default Login;