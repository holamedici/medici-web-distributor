import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import "../styles/dashboard.css";
import mediciLogo from "../imgs/medici-m.png";
import qrcode from "../imgs/qrcode.png";
import user from "../imgs/user.png";

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
      <div className="dashboardTopMenu">
        <div className="dashboardMargin justifyBetween">
          <Link to="/dashboard" className="dashboardTopMenuLink">
            <img src={mediciLogo} className="img" alt="mediciLogo" />{" "}
          </Link>
          <Link to="/dashboard/profile" className="dashboardTopMenuLink">
            <img src={user} className="img" alt="profile" />{" "}
          </Link>
        </div>
      </div>
      <br />
      <br />
      
      <>
        <Outlet />
      </>
    </div>
  );
}
