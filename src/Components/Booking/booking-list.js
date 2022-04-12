import { useState, useEffect } from "react";
import apiClient from '../../http-common';
import configData from '../../configData.json'
import { getUserData } from "../../utility/user-data-util";
import Booking from "./booking";

const BookingList = () => {
    const [bookingList, setBookingList] = useState(null);
    const [listError, setListError] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);

    async function getAllData() {
        const userData = getUserData();
        try {
            const res = await apiClient.get(configData.ROUTES.BOOKING_LIST_CUST);
            console.log(res.data);
            setListError(false);
            setBookingList(res.data);
        } catch (err) {
            setListError(true);
        }
    }

    const renderBookingList = () => {
        if(listError) {
            return (
                <div>
                    <p>Unable to load bookings</p>
                </div>
            )
        } else {
            return (
                <div className="food-menu-container">
                    <div className = "food-menu-grid">
                        {bookingList && bookingList.map((booking, index) =>
                            <Booking
                                key = {`booking-${index}`}
                                bookingId = {booking.bookingId}
                                tableNumber = {booking.tableNumber}
                                date = {booking.date}
                                time = {booking.time}
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
            {renderBookingList()}
       </div>
    )
}

export default BookingList;