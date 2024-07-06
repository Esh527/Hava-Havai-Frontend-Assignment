import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, View } from '@adobe/react-spectrum';
import { defaultTheme } from '@adobe/react-spectrum';
import Header from './Components/HeaderComponent/Header';
import SideBar from './Components/SideBarComponent/SideBar';
import AirportTable from './Components/AirportTableComponent/AirportTable';
import AirportDetail from './Components/AirportDetailComponent/AirportDetail';
import './App.css';

const App = () => {
  return (
    <Provider theme={defaultTheme}>
      <Router>
        <Header />
        <div className="app-container">
          <SideBar />
          
            <Routes>
              <Route path="/" element={<AirportTable />} />
              <Route path="/airports" element={<AirportTable />} />
              <Route path="/airport/:id" element={<AirportDetail />} />
            </Routes>
          
        </div>
      </Router>
    </Provider>
  );
};

export default App;
