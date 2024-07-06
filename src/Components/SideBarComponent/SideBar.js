import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top-container">
        <div className="menu-item">
          <img src='https://res.cloudinary.com/draisdub8/image/upload/v1720259263/Hava%20havai/dcbqpyyec7otmwupdpbj.jpg' alt="Home"/>
          
          <Link to="/airports">Home</Link>
        </div>
        <div className="menu-item">
          <img src='https://res.cloudinary.com/draisdub8/image/upload/v1720259602/Hava%20havai/vyaqxxdazur98klnwrou.png' alt="Dashboard"/>
          
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
     
      <nav aria-label="Main menu">
      <h1 className="section-header" >Services</h1>
        <div className="section" title="Services">
          <div className="item">
            <Link to="/airports">Airports</Link>
          </div>
          <div className="item">
            <Link to="/videos">Videos</Link>
          </div>
        </div>
        <div className="section" title="Others">
        <h1 className="section-header" >Others</h1>
          <div className="item">
            <Link to="/AboutUs">About Us</Link>
          </div>
          <div className="item">
            <Link to="/ContactUs">Contact Us</Link>
          </div>
          <div className="item">
            <Link to="/ChatWithUs">Chat with Us</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
