const Booking = ({bookingId, tableNumber, date, time}) => {
    return (
        <div className="menu-item">
            <p>bookingId : {bookingId}</p>
            <p>table number : {tableNumber}</p>
            <p><b>Date: {date}</b></p>
            <p><b>Time: {time}</b></p>
        </div>
    )
}
export default Booking;