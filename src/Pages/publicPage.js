import {Address} from "../Components/Address/address";
import LoginForm from "../Components/auth/signin";
import FoodMenu from "../Components/FoodMenu/food-menu";
import { Redirect } from "react-router-dom";
import './index.css'

const PublicPage = ({isAuthenticated, setIsAuthenticated}) => {
    if(isAuthenticated) {
        <Redirect to='/dashboard' />
    }
    return (
        <section id="public-page" >
            <div className="food-section">
                <h1 className="text-center p-10">MENU</h1>
                <FoodMenu />
            </div>
            <div className="login-section">
                <LoginForm isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </section>
        
    )
}

export default PublicPage