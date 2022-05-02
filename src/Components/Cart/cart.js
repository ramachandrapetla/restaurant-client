import { useEffect, useState } from "react";
import apiClient from '../../http-common'
import configData from '../../configData.json'
import './cart.css';
import Auth from "../../Auth";

const Cart = () => {
    var data = localStorage.getItem("order");
    const userId = Auth().getUserData().userId;
    const [cart, setCart] = useState(JSON.parse(data) || {});
    const [payment, setPayment] = useState("cash");
    const [subTotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [message, showMessage] = useState(false);
    const [error, showError] = useState(false);

    useEffect(()=> {
        calculateSubTotal();
    }, [])

    const calculateSubTotal = () => {
        const result = Object.keys(cart).reduce((r,d) => r + cart[d].totalPrice, 0);
        setSubtotal(result);
        setTax(Math.round(result*0.06*100)/100)
        return result;
    }

    const buildData = () => {
        
        return data;
    }

    const makeOrder = async () => {
        let data = {orderData: [], tax: 0, total: 0, mode: payment}
        Object.keys(cart).forEach((item, index) => {
            const orderData = {
                userId: userId,
                bookingId: cart[item].bookingId,
                orderType: cart[item].dineIn || "Dine in",
                itemId: item,
                quantity: cart[item].quantity,
                totalPrice: cart[item].totalPrice,
            }

            data.orderData.push(orderData);
        })
        data = {...data, tax: tax, total: subTotal + tax};
        try {
            const res = await apiClient.post(configData.ROUTES.PLACE_ORDER, data);
            showMessage(true);
            localStorage.removeItem("order");
        } catch (err) {
            showError(true)
        }
    }

    const renderCart = () => {
        return (
            <div>

            {Object.keys(cart).length !== 0 ?
                <div>
                    <h2 className="centeredDiv">Order Details</h2>
                    {error ? <h2>Error placing an order. please try again</h2> : <></>}
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Total Price</th>
                            </tr>
                            {
                                Object.keys(cart).map((item, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>{cart[item].itemName}</td>
                                            <td>{cart[item].quantity}</td>
                                            <td>{cart[item].pricePerUnit}</td>
                                            <td>{cart[item].totalPrice}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="aggregate-row">
                                <td>Sub Total : </td>
                                <td>{subTotal}</td>
                            </tr>
                            <tr className="">
                                <td>Tax</td>
                                <td>{tax}</td>
                            </tr>
                            <tr className="">
                                <td>Total</td>
                                <td className="highlight">{subTotal + tax}</td>
                            </tr>
                            </tbody>
                            </table>
                    </div>
                    <div className="centeredDiv">
                        <p>Choose payment Method: </p>
                        
                        <input type="radio" id="cash" name="paymentMethod" value="Cash" onClick={(e) => setPayment("cash")} checked={payment==="cash"}/>
                        <label htmlFor="html">Cash</label><br />
                        <input type="radio" id="card" name="paymentMethod" value="Card" onChange={(e) => setPayment("card")} checked={payment==="card"}/>
                        <label htmlFor="css">Card</label><br />
                        <button className="submitBtn" onClick={() => makeOrder()}>Place Order</button>
    
                    </div>
                    
                </div>
                : 
                <div className="message-container alert-warning">
                    <p>Cart is Empty !!</p>
                </div>
            }
            </div>
        )
    }

    return (
        <div>
            {message ? 
                <div className="message-container alert-success">
                    <p>Order Placed Successfully !</p>
                </div>
                :
                renderCart()
            }
        </div>
       
    )
}

export default Cart;