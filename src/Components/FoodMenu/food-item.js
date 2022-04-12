import { isUserLoggedIn } from "../../utility/user-data-util";

const FoodItem = ({itemId, itemDesc, itemName, price}) => {
    const handleAddToCart = (itemid)=> {
        if(isUserLoggedIn())
            alert("added to cart!");
        else
            alert("user should login for adding to cart");
    }

    return (
        <div className="menu-item">
            <h1>{itemName}</h1>
            <p>{itemDesc}</p>
            <p><b>Price: ${price}</b></p>
            <button onClick={() => handleAddToCart(itemId)}>Add to Cart</button>
        </div>
    )
};

export default FoodItem;