import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ProfileDashboard(props) {
  let navigate = useNavigate();
  useEffect(() => {
    console.log("at home");
    let authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (!authToken) {
      navigate("/dashboard");
    }
    console.log("prop", props.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLogout = async () => {
    sessionStorage.removeItem("Auth Token");
    await props.setToken(false);
    await navigate("/");
  };
  return (
    <div className="dashboardMargin">
      <div className="genWidget" onClick={handleLogout}>
        <div className="genWidgetInner  blackText">
          <p className="genSmallSubtitle noMargin">Welcome</p>
          <p className="largeTitle  midTextWeight noMargin">
            {props.user.email}
          </p>
          <div className="bottomBorder" />
          <div className="justifyBetween">
            <div className="leftSideWidgetIcon  justifyHorizontal">
              <p className="genSmallSubtitle noMargin">Last login</p>
              <span className="genSubtitle smallLeftPadding">00:00</span>
            </div>
            <div className="leftSideWidgetIcon  justifyHorizontal">
              <p className="genSmallSubtitle noMargin">Joined</p>
              <span className="genSubtitle smallLeftPadding">00:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
