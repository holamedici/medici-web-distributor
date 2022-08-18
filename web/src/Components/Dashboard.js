import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "./Camera/index";

export default function Dashboard(props) {
  const [data, setData] = useState('No result');

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
      Home Page
      <button onClick={handleLogout}>Log out</button>
      <>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{data}</p>
      </>
    </div>
  );
}
