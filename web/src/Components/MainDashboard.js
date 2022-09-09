import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function MainDashboard(props) {

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
    <div>
      <br /> <br />
      <h3 className="genTitle noMargin">Dashboard</h3>
      <>
        <p>Welcome {props.user?.email}</p>
        <p>Score {60}</p>

      </>
    </div>
  );
}
