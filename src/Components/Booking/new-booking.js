import {useEffect, useState } from 'react'
import apiClient from '../../http-common';
import configData from '../../configData.json'

const NewBooking = ({userData, closeModal}) => {
    const [tablesData, setTablesData] = useState([]);
    const [error, setError] = useState(true);
    const [tableNumber, setTableNumber] = useState(0);

    useEffect(() => {
        getTableData();
    }, [])

    async function getTableData() {
        try {
            const res = await apiClient.get(configData.ROUTES.GET_AVAILABLE_TABLES);
            console.log(res.data);
            setError(false);
            setTablesData(res.data);
            console.log("tablesData : ", tablesData);
        } catch (err) {
            setError(true);
        }
    }

    function handleChange(e) {
        console.log(e.target.value);
        const tableNumber = e.target.value;
        setTableNumber(tableNumber);
    }

    async function makeReservation() {
        if(tableNumber == 0) {
            setError("Please select Table");
        } else {
            const bookingData = {
                tableNumber : tableNumber,
                userId: userData.userId
            }
            try{
                const res = await apiClient.post(configData.ROUTES.MAKE_RESERVATION, bookingData, {
                    headers: {
                        'x-access-token': "Bearer " + userData.accessToken
                    }
                });
                alert("Booking Successfull")
                getTableData(); // refresh
                setTableNumber(0);

            } catch(err) {
                setError("Unable to make a reservation");
            }
        }
    }

    function getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
        return today;
      }

      function getTime() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return time;
      }

    const renderBookingDetails = () => {
        return (
            <div className="content-wrapper">
                <h2>Booking Details</h2>
                <p>Only onspot reservations available! Future reservation are yet to be implemented!</p>
                Name: <input type="text" value={userData.fname + " " + userData.lname} disabled />
                Phone: <input type="telephone" value={userData.phone} disabled />
                Date: <input type="date" value={getDate()} disabled/>
                Time: <input type="text" value={getTime()} disabled />
                <p>Choose Table: </p>
                <select onChange={handleChange}>
                    <option value={0}>---select table---</option>
                    {
                        tablesData && tablesData.map((table) => {
                            return(
                            <option key={"table" + table.tableNumber} value ={table.tableNumber}>
                                 Table Number : {table.tableNumber}  |  Capacity : {table.capacity}
                            </option>
                            )
                        })
                    }
                </select>
                <button onClick={makeReservation}>Reserve</button>


            </div>
        )
    }

    return (
        <div id="new-booking-container" className="modal">
            <div class="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                {
                    error ? <p>{error || "Unable to make a Reservation. Try again Later"}</p>
                    : renderBookingDetails()
                }
            </div>
      </div>
    )
}

export default NewBooking;