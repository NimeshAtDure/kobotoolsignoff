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

  let token = useSelector((state) => state.user.token)

  function getElement(e) {
      if (token) {
        switch (e) {
          case "forms": 
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
        {/* <Route path="/" element={token ? <Navigate to="/forms" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="/login" element={token ? <Navigate to="/forms" replace={true} /> : getElement("login")}/>
        <Route path="/forms" element={!token ? <Navigate to="/login" replace={true} /> : getElement("forms")} />
        <Route path="/signoff" element={getElement("signoff")} />
        <Route path="/dashboard" element={getElement("dashboard")} /> */}

        <Route path="/" element={token ? <Navigate to="/dashboard" replace={true} /> : <Navigate to="/login" replace={true} />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace={true} /> : getElement("login")}/>
        <Route path="/dashboard" element={!token ? <Navigate to="/login" replace={true} /> : getElement("dashboard")} />
        <Route path="/signoff" element={getElement("signoff")} />
        <Route path="/forms" element={getElement("forms")} />
      </Routes>
    </div>
  );
}

export default App;
