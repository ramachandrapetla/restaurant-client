import { useState, useEffect } from "react";
import { getUserData, isUserLoggedIn } from "../../utility/user-data-util";
import FoodMenu from "../FoodMenu/food-menu";
import { Redirect } from "react-router-dom";
import Auth from "../../Auth";

const Dashboard = ({isAuthenticated}) => {
    const[userData, setUserData] = useState(Auth().getUserData());
    

    if(isAuthenticated)
        return (
            <div>
                <div>
                    <h1>Welcome {userData.fname}</h1>
                    <div className="p-20-10">
                        <FoodMenu />
                    </div>
                </div>
            </div>
        )
    else return <Redirect to="/" />
}

export default Dashboard;