import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "./Camera/index";
import { collection, query, doc, getDoc, updateDoc } from "firebase/firestore";
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
  const handleData =  (transactionID) => {
    console.log("1");
    const transactionsRef = query(collection(db, "transactions"));
    console.log("2");
    getDoc(doc(transactionsRef, transactionID))
      .then((response) => {
        console.log("3", response);
        const data = response.data();
        console.log("4");
        const currentTime = parseInt(Date.now());
        console.log("5");
        if (!data?.executed || currentTime - data?.date > 90) {
          return;
        }
        console.log("6");
        const usersRef = doc(db, "users", data.senderID);
        console.log("7");
        getDoc(usersRef).then((userResponse) => {
          const userRespData = userResponse.data();
          console.log("res", userRespData);
          console.log("userResponse", userRespData.mediciCredit - data.amount);
          updateDoc(usersRef, {
            mediciCredit: userRespData.mediciCredit - data.amount,
          }).then(() => {
            updateDoc(transactionsRef, {
              executed: true,
            });
          });
        });
        console.log("8");
      })
      .catch((error) => {
        console.log(error);
      });

    setTransactionData(data);
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
