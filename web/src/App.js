import { useEffect, useState } from "react";
import "./App.css";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [tokenExists, setTokenExists] = useState(false);
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
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login setToken={setTokenExists} />} />
          <Route
            path="/register"
            element={<Register setToken={setTokenExists} />}
          />
          <Route path="/404" element={<NotFound />} />
          {tokenExists ? (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard setToken={setTokenExists} />}
              />
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
