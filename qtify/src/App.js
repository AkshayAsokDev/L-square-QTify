import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';



function App() {
  return (
    <div className="App">
      {/* Define the routes for the application
        1. Home 
        2. Album details
      */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>


      {/* Navbar code needs to be updated
          requires package installation + asset updation + code fix
      */}
      {/* <Navbar /> */}
    </div>
  );
}

export default App;
