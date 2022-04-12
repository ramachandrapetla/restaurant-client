import './App.css';
import {Footer} from "./Components/Footer/footer";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicPage from "./Pages/publicPage";
import NavBar from "./Components/NavBar/navbar";
import LoginForm from './Components/auth/signin';
import Dashboard from './Components/Dashboard/dashboard';
import { useState } from 'react';
import BookingList from './Components/Booking/booking-list';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginState = (status) => {
    setIsLoggedIn(status);
  }

  return (
    <div className="App">
        <NavBar isLoggedIn={isLoggedIn} setLoginState={setLoginState} />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <PublicPage />
                </Route>
                <Route exact path="/login">
                  <LoginForm setLoginState={setLoginState}/>
                </Route>
                <Route exact path="/dashboard" >
                  <Dashboard isLoggedIn={isLoggedIn}/>
                </Route>
                <Route path="/bookings" component={BookingList}/>
                
            </Switch>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
