import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "./Camera/index";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function CameraDashboard(props) {
  const [data, setData] = useState("No result");
  const [transactionData, setTransactionData] = useState({
    senderName: "",
    amount: "",
    date: 0,
  });

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
  const handleData = (transactionID) => {
    console.log("1");
    const transactionsRef = doc(db, "transactions", transactionID);
    console.log("2");
    getDoc(transactionsRef)
      .then((response) => {
        console.log("3", response);
        const data = response.data();
        console.log("4 data", data);
        const currentTime = parseInt(Date.now());
        console.log("5 currentTime", currentTime - data?.date);
        if (data?.executed || currentTime - data?.date > 90000) {
          console.log("outcha");
          return;
        }
        if (
          window.confirm(
            "Are you sure you want to accept " +
              data.amount +
              " credits from " +
              data.senderName
          )
        ) {
          console.log("6");
          const usersRef = doc(db, "users", data.senderID);
          console.log("7");
          getDoc(usersRef).then((userResponse) => {
            const userRespData = userResponse.data();
            console.log("res", userRespData);
            console.log(
              "userResponse",
              userRespData.mediciCredit - data.amount
            );
            updateDoc(usersRef, {
              mediciCredit: userRespData.mediciCredit - data.amount,
            }).then(() => {
              console.log("joeeyy");
              updateDoc(transactionsRef, {
                executed: true,
              });
            });
          });
          console.log("8");
          window.alert("Transaction Executed");
        } else {
          // Do nothing!
          window.alert("Transaction declined");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setTransactionData(data);
    setData(transactionID);
  };
  return (
    <div className="centerText">
        <h3 className="genTitle mediciRedText noMargin">Scan Medici QR code below</h3>
<br/>
      <>
        <div className="cameraDiv">
          <QrReader
            className="noMargin"
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
        </div>
      </>
    </div>
  );
}
