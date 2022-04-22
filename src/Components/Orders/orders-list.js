import { useState, useEffect } from "react";
import apiClient from '../../http-common';
import configData from '../../configData.json'
import Auth from '../../Auth';
import './orders.css';

const OrdersList = () => {
    
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState(Auth().getUserData());

    useEffect(() => {
        getAllData();
    }, []);

    async function getAllData() {
        try {
            const res = await apiClient.get(configData.ROUTES.GET_ORDERS + userData.userId);
            console.log(res.data);
            setError(false);
            setOrders(res.data);
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }
    return (
        <div>
            <table className="orders-table">
                <tr>
                    <th>Order Number</th>
                    <th>Order Type</th>
                    <th>Price</th>
                </tr>
                {
                    orders.map((order, index) => {
                        return (
                            <tr className="order-row">
                                <td><a href={`/orders/${order.orderId}`}>ORDER-{index + 1}</a></td>
                                <td>{order.OrderType}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default OrdersList;