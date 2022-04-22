import {useState, useEffect} from 'react';
import apiClient from '../../http-common';
import configData from '../../configData.json';
import { Redirect, useHistory } from 'react-router-dom';
import './login-register.css';
import Auth from '../../Auth';

const LoginForm = ({isAuthenticated, setIsAuthenticated}) => {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const { login } = Auth();

    // useEffect(() => {
    //     
    // }, []);


    const handleLoginForm = async () => {
        if(userName == "" || password == "") {
            setError("Fields are required.");
            return;
        }
        try {
            const res = await apiClient.post(configData.ROUTES.LOGIN,{
                userName,
                password
            });
            const result = {
                status: res.status,
                data: res.data,
            };
            login(result.data);
            setIsAuthenticated(true);


        } catch (err) {
            //setError(err.response.data.message);
            //console.log(err.response.data);
            alert("login failed: ");
        }
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    else 
        return (
            <div className='login-container'>
                <div className="login-wrapper">
                    <p>Please enter your credentials</p>
                    <input type= "text" placeholder = "username" onChange={(e) => setUserName(e.target.value)}/>
                    <input type= "password" placeholder = "password" onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={handleLoginForm}>Login</button>
                    <a href="/register" >register</a>
                </div>
            </div>
        )
}

export default LoginForm;