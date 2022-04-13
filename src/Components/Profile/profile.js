import Auth from '../../Auth';
import './profile.css';

const Profile = () => {
    const userData = Auth().getUserData();
    return(
        <div className="centered-container">
            <div className="centered-wrapper "> 
                <h3>Customer Profile</h3>
                <p>First Name: {userData.fname}</p>
                <p>Last Name: {userData.lname}</p>
                <p>Phone: {userData.phone}</p>
                <p>Email: {userData.email}</p>
                <p><b>Customer Credits: 10</b></p>
            </div>
       </div>
    )
}

export default Profile;