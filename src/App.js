import './App.css';
import {Footer} from "./Components/Footer/footer";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicPage from "./Pages/publicPage";
import NavBar from "./Components/NavBar/navbar";
import LoginForm from './Components/auth/signin';
import Dashboard from './Components/Dashboard/dashboard';
import { useState } from 'react';
import BookingList from './Components/Booking/booking-list';
import Profile from './Components/Profile/profile';
import OrdersList from './Components/Orders/orders-list';
import Cart from './Components/Cart/cart';
import Auth from './Auth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  
  const[isAuthenticated, setIsAuthenticated] = useState(Auth().isAuthenticated);

  return (

    <div className="App">
        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <PublicPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                </Route>
                <Route exact path="/login">
                  <LoginForm isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
                </Route>
                <Route exact path="/dashboard" >
                  <Dashboard isAuthenticated={isAuthenticated}/>
                </Route>
                <ProtectedRoute path="/bookings" isAuthenticated={isAuthenticated}>
                  <BookingList />
                </ProtectedRoute>
                <ProtectedRoute path="/profile" isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
                <ProtectedRoute path="/orders" isAuthenticated={isAuthenticated}>
                  <OrdersList />
                </ProtectedRoute>
                <ProtectedRoute path="/cart" isAuthenticated={isAuthenticated}>
                  <Cart />
                </ProtectedRoute>
                
            </Switch>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
