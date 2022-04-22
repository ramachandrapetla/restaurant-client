import { useState, useEffect } from "react";
import { isUserLoggedIn } from "../../utility/user-data-util";

const FoodItem = ({itemId, itemDesc, itemName, price, cartData, setCartData}) => {
    const [qty, setQty] = useState(0);
    const [cart, setCart] = useState({})

    useEffect(() => {
        if(cartData) {
            var qty = cartData[`${itemId}`]?.quantity || 0;
            setQty(qty);
        }
    }, [])

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    const handleAddToCart = (i)=> {
        if(isUserLoggedIn()) {
            if(qty + i == 0) {
                delete cartData[`${itemId}`];
                localStorage.setItem("order", formatResponse(cartData))
                setCartData(cartData);
                setQty(0);

            }
            else {
                console.log("Obtained state: ", cartData);
                cartData[`${itemId}`] = {
                    itemName: itemName,
                    quantity: qty + i,
                    pricePerUnit: price,
                    totalPrice: (qty+i)*price
                }
                console.log("Adding/Modifying State: ", cartData);
                localStorage.setItem("order", formatResponse(cartData))
                setCartData(cartData);
                setQty(qty + i);
            }
            
        }

        else
            alert("user should login for adding to cart");
    }

    return (
        <div className="menu-item">
            <h1>{itemName}</h1>
            <p>{itemDesc}</p>
            <p className="price-field"><b>Price: ${price}</b></p>
            {
                qty == 0 ? <button className="item-cart-btn" onClick={() => handleAddToCart(1)}>Add to Cart</button>
                :<div>
                    <button className="incr-button" onClick={() => handleAddToCart(-1)}>-</button>
                    <input className="item-count-field" type="text" value={qty} disabled/>
                    <button className="decr-button" onClick={() => handleAddToCart(1)}>+</button>
                </div>
            }
        </div>
    )
};

export default FoodItem;