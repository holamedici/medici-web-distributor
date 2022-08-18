import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "./Camera/index";
import { collection, query, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Dashboard(props) {
  const [data, setData] = useState("No result");
  const [transactionData, setTransactionData] = useState({
    senderName: "",
    amount: "",
    date: 0,
  });

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
  const handleData = async (transactionID) => {
    const transactionsRef = query(collection(db, "transactions"));
    getDoc(doc(transactionsRef, transactionID))
      .then((response) => {
        setTransactionData(response.data());
      })
      .catch((error) => {
        alert(error);
      });
    setData(transactionID);
  };
  return (
    <div>
      Home Page
      <button onClick={handleLogout}>Log out</button>
      <>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{transactionData?.senderName}</p>
        <p>{transactionData?.amount}</p>
        <p>{transactionData?.date}</p>
        <p>{data}</p>
      </>
    </div>
  );
}
