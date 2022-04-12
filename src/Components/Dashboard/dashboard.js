import { useState, useEffect } from "react";
import { getUserData, isUserLoggedIn } from "../../utility/user-data-util";
import FoodMenu from "../FoodMenu/food-menu";
import { Redirect } from "react-router-dom";
const Dashboard = ({isLoggedIn}) => {
    const[userData, setUserData] = useState({});
    
    useEffect(() => {
        const data = getUserData();
        setUserData(data);
    
      }, []);

    return (
        <div>
            {isUserLoggedIn() ?
                <div>
                    <h1>Welcome {userData.fname}</h1>
                    <div className="p-20-10">
                        <FoodMenu />
                    </div>
                </div> : ""
            }
        </div>
    )
}

export default Dashboard;