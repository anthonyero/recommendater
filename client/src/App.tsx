import React from 'react';
import { Outlet } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  
  return (
    <React.StrictMode>
      <Auth0Provider
        domain='dev-q6ysbscflfuvzzf8.us.auth0.com'
        clientId='2RNUWugrFHPGkNdCMI0kw2jIqojr5H5S'
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <h1>RecommenDater</h1>
        <Navbar />
        <Outlet />
    </Auth0Provider>
  </React.StrictMode>
    
  )
};

export default App;
