import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";


export default function Dashboard(props) {
  const [currentView, setCurrentView] = useState("dash");


  const handleLogout = async () => {
    sessionStorage.removeItem("Auth Token");
    await props.setToken(false);
    await navigate("/");
  };

  let navigate = useNavigate();
  useEffect(() => {
    console.log("at home");
    let authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (!authToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <span className="genLink noMargin" onClick={handleLogout}>
        Log out
      </span>
      <br />
      <br />
      <Link
        to="/dashboard/camera"
        className="genLink noMargin"
        onClick={() => setCurrentView("cam")}
        style={{
          background: currentView === "cam" ? "grey" : "transparent",
          color: currentView === "cam" ? "white" : "black",
        }}
      >
        Scan QR Code
      </Link>
      <span> | | </span>
      <Link
        to="/dashboard/main"
        className="genLink noMargin "
        onClick={() => setCurrentView("dash")}
        style={{
          background: currentView === "dash" ? "grey" : "transparent",
          color: currentView === "dash" ? "white" : "black",
        }}
      >
        Go to Dashboard
      </Link>
      <>
        <Outlet />
      </>
    </div>
  );
}
