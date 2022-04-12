import {useState, useEffect} from 'react';
import apiClient from '../../http-common';
import configData from '../../configData.json';
import { useHistory } from 'react-router-dom';
import './login-register.css'

const LoginForm = ({setLoginState}) => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userData");
        if (loggedInUser)
          history.push('/dashboard');
      }, []);


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
            setLoginState(true);
            localStorage.setItem('userData', JSON.stringify(result.data));
            history.push("/dashboard");


        } catch (err) {
            setLoginState(false);
            setError(err.response.data.message);
            console.log(err.response.data);
            alert("login failed: ", err.response.data.message);
        }
    }

    return (
        <div className='login-container'>
            <div className="login-wrapper">
                <p>Please enter your credentials</p>
                <input type= "text" placeholder = "username" onChange={(e) => setUserName(e.target.value)}/>
                <input type= "password" placeholder = "password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleLoginForm}>Login</button>
                <a href="#" >register</a>
            </div>
        </div>
    )
}

export default LoginForm;