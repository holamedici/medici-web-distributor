import { useEffect, useState } from "react";
import "./App.css";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import MainDashboard from "./Components/MainDashboard";
import CameraDashboard from "./Components/CameraDashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [tokenExists, setTokenExists] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    let currentAuthToken = sessionStorage.getItem("Auth Token");
    if (currentAuthToken) {
      console.log("going to dash");
      setTokenExists(true);
    }
  }, []);
  // const setToken =() =>{
  //   setTokenExists
  // }
  return (
    <div className="App">
      <>
        {" "}
        <br />
        <br />
        <br />
        <h1 className="pageTitle">Medici Distributor System</h1>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} setToken={setTokenExists} />} />
          <Route
            path="/register"
            element={<Register setToken={setTokenExists} />}
          />
          <Route path="/404" element={<NotFound />} />
          {tokenExists ? (
            <>
              <Route
                path="dashboard"
                element={<Dashboard setToken={setTokenExists} />}
              >
                <Route index element={<MainDashboard setToken={setTokenExists} />} />
                <Route path="main" element={<MainDashboard user = {user} setToken={setTokenExists} />} />
                <Route path="camera" element={<CameraDashboard setToken={setTokenExists} />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Navigate to={"/"} />} />
            </>
          )}
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
