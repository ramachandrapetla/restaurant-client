import { useEffect, useState } from "react";
import './cart.css';

const Cart = () => {
    var data = localStorage.getItem("order");
    const [cart, setCart] = useState(JSON.parse(data) || {});
    const [payment, setPayment] = useState("cash");
    const [subTotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(()=> {
        calculateSubTotal();
    }, [])

    const calculateSubTotal = () => {
        const result = Object.keys(cart).reduce((r,d) => r + cart[d].totalPrice, 0);
        setSubtotal(result);
        setTax(Math.round(result*0.06*100)/100)
        return result;
    }

    return (
        <div>

        {Object.keys(cart).length !== 0 ?
            <div>
                <h2 className="centeredDiv">Order Details</h2>
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
                    <button className="submitBtn">Place Order</button>

                </div>
                
            </div>
            : <p>!! CART IS EMPTY !!</p>
        }
        </div>
    )
}

export default Cart;