import { useState } from 'react';

export default function Auth() {
  const loginStatus = () => {
    const data = localStorage.getItem('userData');
    const parsedData = JSON.parse(data);
    return parsedData? parsedData.accessToken ? true : false : false;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(loginStatus);

  const login = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(userData.accessToken));
    setIsAuthenticated(true);
  };

  const getUserData = () => {
    const data = localStorage.getItem('userData');
    const parsedData = JSON.parse(data);
    return parsedData;
  };


  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('order');
      
  }

  return {
    login: login,
    logout: logout,
    getUserData: getUserData,
    isAuthenticated
  }
}