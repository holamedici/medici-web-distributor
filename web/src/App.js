import { useEffect, useState } from "react";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import {MainDashboard} from "./Components/MainDashboard";
import {CameraDashboard} from "./Components/CameraDashboard";
import {AnalyticsDashboard} from "./Components/AnalyticsDashboard";
import {ProfileDashboard} from "./Components/ProfileDashboard";
import {InviteDashboard} from "./Components/InviteDashboard";

import { Routes, Route, Navigate } from "react-router-dom";
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
        <Routes>
          <Route
            path="/"
            element={<Login setUser={setUser} setToken={setTokenExists} />}
          />
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
                <Route
                  index
                  element={<MainDashboard setToken={setTokenExists} />}
                />
                <Route
                  path="main"
                  element={<MainDashboard setToken={setTokenExists} />}
                />
                <Route
                  path="camera"
                  element={<CameraDashboard setToken={setTokenExists} />}
                />
                <Route
                  path="analytics"
                  element={<AnalyticsDashboard setToken={setTokenExists} />}
                />
                <Route
                  path="profile"
                  element={
                    <ProfileDashboard user={user} setToken={setTokenExists} />
                  }
                />
                <Route
                  path="invite"
                  element={<InviteDashboard setToken={setTokenExists} />}
                />
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
