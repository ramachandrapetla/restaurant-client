import { useState } from "react";
import apiClient from '../../http-common';
import configData from '../../configData.json';

const Register = ({role}) => {
    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        salary: 0,
        role: ""
    })

    const [error, setError] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [message, setMessage] = useState("");

    const validateData = () => {
        if(userData.fname == "" || userData.lname == "" || 
        userData.phone == "" || userData.email == "" || userData.username == "" || 
        userData.password == "" || userData.city == "" || userData.state == "" || userData.zipcode == "") {
            setError(true);
            setMessage("Some information is missing!!");
            return false;
        }
        else {
            setError(false);
            return true;
        }

    }

    const registerUser = async () => {
        if(validateData()) {
            try {
                const data = {
                    user: {
                        fname: userData.fname,
                        lname: userData.lname,
                        phone: userData.phone,
                        email: userData.email,
                        userName: userData.username,
                        password: userData.password,
                    },
                    address: {
                        street: userData.street,
                        city: userData.city,
                        state: userData.state,
                        zipcode: userData.zipcode
                    },
                    userRole: {
                        roleCode: role || "C"
                    }

                }
                if(role == "E") {
                    data.employee = {
                        salary: userData.salary,
                        role: userData.role
                    }
                }

                const res = await apiClient.post(configData.ROUTES.REGISTER, data);
                const result = {
                    status: res.status,
                    data: res.data,
                };

                if(result.status == 200){
                    setShowForm(false);
                    setMessage("User Registerd successfully!")
                }
                else {
                    setError(true);
                    setMessage("Unable to register user. Try again after some time");
                }
    
    
            } catch (err) {
                setError(true);
                setMessage("Unable to register user. Try again after some time")
            }
        }
        else return;
    }

    const renderForm = () => {
        return (
            <div className="register-form-wrapper">
                <div>
                    <h2 className="mb-10">Registration</h2>
                </div>
                <div>
                    <p className="mb-10">Already have an account? <a href="/login">Login</a> here</p>
                </div>
                {
                    error ? <p className="mb-10 error-msg">{message}</p> : <></>
                }
                <h3 className="mb-10">User Information</h3>
                <label htmlFor="fname">First Name: </label>
                <input className="form-input" name="fname" type="text" onChange={(e) => setUserData({...userData, fname: e.target.value})}/>
                <label htmlFor="lname">Last Name: </label>
                <input className="form-input" name="lname" type="text" onChange={(e) => setUserData({...userData, lname: e.target.value})}/>
                <label htmlFor="phone">Phone: </label>
                <input className="form-input" name="phone" type="text" onChange={(e) => setUserData({...userData, phone: e.target.value})}/>
                <label htmlFor="email">Email: </label>
                <input className="form-input" name="email" type="text" onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                <label htmlFor="username">username: </label>
                <input className="form-input" name="username" type="text" onChange={(e) => setUserData({...userData, username: e.target.value})}/>
                <label htmlFor="password">Password: </label>
                <input className="form-input" name="password" type="password" onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                <h3 className="mb-10">Address Information</h3>
                <label htmlFor="street">Street: </label>
                <input className="form-input" name="street" type="text" onChange={(e) => setUserData({...userData, street: e.target.value})}/>
                <label htmlFor="city">City: </label>
                <input className="form-input" name="city" type="text" onChange={(e) => setUserData({...userData, city: e.target.value})}/>
                <label htmlFor="state">State: </label>
                <input className="form-input" name="state" type="text" onChange={(e) => setUserData({...userData, state: e.target.value})}/>
                <label htmlFor="zipcode">Zipcode: </label>
                <input className="form-input" name="zipcode" type="text" onChange={(e) => setUserData({...userData, zipcode: e.target.value})}/>
                
                { role == "E" ?
                    <div>
                        <h3 className="mb-10">Employment Information</h3>
                        <label htmlFor="salary">Salary: </label>
                        <input className="form-input" name="salary" type="number" onChange={(e) => setUserData({...userData, salary: e.target.value})}/>
                        <label htmlFor="role">Role: </label>
                        <input className="form-input" name="role" type="text" onChange={(e) => setUserData({...userData, role: e.target.value})}/>
                    </div> : <></>
                }
                <button className="register-btn" onClick={registerUser}>Register</button>
        
            </div>
        )
    }

    const renderMessage = () => {
        return (
            <div>
                <p className="mb-10">{message}</p>
                <p>click here to <a href="/login">Login</a></p>
            </div>
        )
    }

    return (
        <div className = "register-form-container">
            {
                showForm ? renderForm() : renderMessage()
            }
        </div>
    )
}

export default Register;