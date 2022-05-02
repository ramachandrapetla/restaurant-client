import { useState, useEffect } from "react";
import { getUserData, isUserLoggedIn } from "../../utility/user-data-util";
import FoodMenu from "../FoodMenu/food-menu";
import { Redirect } from "react-router-dom";
import Auth from "../../Auth";
import AdminDashBoard from "../AdminDashboard/admin-dashboard";

const Dashboard = ({isAuthenticated}) => {
    const[userData, setUserData] = useState(Auth().getUserData());

    if(userData && userData.roleCode =='C')
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
    else if(userData && (userData.roleCode == 'E' || userData.roleCode == 'A') )
        return <AdminDashBoard />
    else return <Redirect to="/" />
}

export default Dashboard;