import { useState, useEffect } from "react";
import apiClient from '../../http-common';
import configData from '../../configData.json'
import Booking from "./booking";
import Auth from '../../Auth';
import NewBooking from "./new-booking";
import './booking.css';

const BookingList = () => {
    const [bookingList, setBookingList] = useState(null);
    const [listError, setListError] = useState(false);
    const [userData, setUserData] = useState(Auth().getUserData());
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);

    async function getAllData() {
        try {
            const res = await apiClient.get(configData.ROUTES.BOOKING_LIST_CUST + userData.userId);
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
                <div className="booking-container">
                    <div>
                        <button onClick={() => setShowModal(true)}>New Reservation</button>
                    </div>
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
                    {
                        showModal ? <NewBooking userData={userData} closeModal={() => setShowModal(false)}/> : <></>
                    }
                </div>
            )
        }
    }

    return (
       <div>
            {renderBookingList()}
       </div>
    )
}

export default BookingList;