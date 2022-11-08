import { useEffect, useState } from "react";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import MainDashboard from "./Components/MainDashboard";
import CameraDashboard from "./Components/CameraDashboard";
import AnalyticsDashboard2 from "./Components/AnalyticsDashboard2";
import ProfileDashboard2 from "./Components/ProfileDashboard2";
import InviteDashboard2 from "./Components/InviteDashboard2";

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
                  element={<AnalyticsDashboard2 setToken={setTokenExists} />}
                />
                <Route
                  path="profile"
                  element={
                    <ProfileDashboard2 user={user} setToken={setTokenExists} />
                  }
                />
                <Route
                  path="invite"
                  element={<InviteDashboard2 setToken={setTokenExists} />}
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
