import React from 'react';

import { auth, provider } from '../../firebase/firebase';
import { useStateValue } from '../../context-api/StateProvider';
import { actionTypes } from '../../context-api/reducer';

import './login.style.css';

const Login = ({ parentCallbackForUser }) => {
    const [{}, dispatch] = useStateValue();

    const loginUsingGoogle = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
            parentCallbackForUser(result.user);
        }).catch(err => alert(err.message));
    }

    return (
        <div className="login">
            <h1 className="login__title">Task Simplifier</h1>
            <p className="login__subtitle">Simplify your day</p>
            <button className="login__button" onClick={loginUsingGoogle}>
                Login using Google
            </button>
        </div>
    );
}

export default Login;