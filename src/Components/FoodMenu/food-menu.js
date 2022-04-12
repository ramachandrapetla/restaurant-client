import {useState, useEffect} from 'react'
import FoodItem from "./food-item"
import apiClient from '../../http-common'
import configData from '../../configData.json'
import './food-menu.css'

const FoodMenu = () => {

    const [foodMenu, setFoodMenu] = useState(null);
    const [menuError, setMenuError] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };
    async function getAllData() {
        try {
            const res = await apiClient.get(configData.ROUTES.FOOD_MENU);
            console.log(res.data);
            setMenuError(false);
            setFoodMenu(res.data);
        } catch (err) {
            setMenuError(true);
        }
    }

    const renderFoodMenu = () => {
        if(menuError) {
            return (
                <div>
                    <p>Unable to load menu</p>
                </div>
            )
        } else {
            return (
                <div className="food-menu-container">
                    <div className = "food-menu-grid">
                        {foodMenu && foodMenu.map((foodItem, index) =>
                            <FoodItem
                                key = {`item-${index}`}
                                itemId = {foodItem.itemId}
                                itemName = {foodItem.itemName}
                                itemDesc = {foodItem.itemDesc}
                                price = {foodItem.price}
                            />
                        )}
                    </div>
                </div>
            )
        }
    }

    return (
       <div>
           <div>Food Menu</div>
            {renderFoodMenu()}
       </div>
    )
}

export default FoodMenu;