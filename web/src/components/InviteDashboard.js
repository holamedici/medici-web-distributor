import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function InviteDashboard(props) {
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

  return (
    <div className="dashboardMargin">
      <div className="genWidget">
        <div className="genWidgetInner  blackText">
          <p className="genSmallSubtitle noMargin">Hold on...</p>
          <p className="largeTitle  midTextWeight noMargin">
            Coming Soon
          </p>
          
        </div>
      </div>
    </div>
  );
}
