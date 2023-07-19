import './App.css';
import './Responsive.css'
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Signoff from "./Signoff"
import Formview from "./Formview"
import Loginpg from "./Loginpg"
import Dashboardview from './Dashboardview';
import Passreset from './Passreset';
import ProgressOverview from './ProgressOverview';
import Signoffdata from './Signoffdata'
import Formdisp from './Formdisp';

function App() {

  let token = useSelector((state) => state.user.token)
  let data = useSelector((state) => state.user.data)
  let username = data.length>0 ? JSON.parse(data).username : null
  function getElement(e) {
      if (token) {
        switch (e) {
          case "forms": 
            return <Formview />
          case "login": 
            return <Navigate to="/home" replace={true} />
          case "signoff": 
            return <Signoffdata />
          case "dashboard": 
            return <Dashboardview />
          case "passreset":
            return <Passreset/>
          case "progressoverview":
            return <Signoffdata/>
          case "formsdisp":
            return <Formdisp/>
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
        {/* <Route path="/signoff" element={ ( username && ( username.includes("admin") || username.includes("kaushik") ) )? getElement("signoff") : <Navigate to="/" replace={true} /> }/> */}
        <Route path="/signoff" element={ getElement("signoff")  }/>
        <Route path="/statesignoff" element={ getElement("signoff")  }/>
        <Route path="/respsignoff" element={ getElement("signoff")  }/>
        <Route path="/forms" element={getElement("forms")} />
        <Route path="/formsview/:formid" element={getElement("formsdisp")} />
        <Route path='/passreset' element={getElement("passreset")} />
        <Route path='/progressoverview' element={getElement("progressoverview")} />
      </Routes>
    </div>
  );
}

export default App;
