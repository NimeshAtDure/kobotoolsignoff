import './App.css';
import './Responsive.css'
import {Route, Routes, Navigate } from "react-router-dom";
import Signoff from "./Signoff"
import Formview from "./Formview"
import Loginpg from "./Loginpg"
//import Dashboardview from './Dashboardview';
import Dashboardview from './Dashboardview1';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to='/home' replace={true} />} />
        <Route path="/home" element={<Formview />} />
        <Route path="/signoff" element={<Signoff />} />
        <Route path="/login" element={<Loginpg />} />
        <Route path="/dashboard" element={<Dashboardview />} />
      </Routes>
    </div>
  );
}

export default App;
