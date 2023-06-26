import './App.css';
import './Responsive.css'
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Signoff from "./Signoff"
import Formview from "./Formview"
import Loginpg from "./Loginpg"
import Dashboardview from './Dashboardview';
//import Dashboardview from './Dashboardview1';

function App() {

  let token = useSelector((state) => state.token.value)

  function getElement(e) {
      if (token) {
        switch (e) {
          case "home": 
            return <Formview />
          case "login": 
            return <Navigate to="/home" replace={true} />
          case "signoff": 
            return <Signoff />
          case "dashboard": 
            return <Dashboardview />
        }
      } else {
        return <Loginpg />
      }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="/login" element={token ? <Navigate to="/home" replace={true} /> : getElement("login")}/>
        <Route path="/home" element={!token ? <Navigate to="/login" replace={true} /> : getElement("home")} />
        <Route path="/signoff" element={getElement("signoff")} />
        <Route path="/dashboard" element={getElement("dashboard")} />
      </Routes>
    </div>
  );
}

export default App;
