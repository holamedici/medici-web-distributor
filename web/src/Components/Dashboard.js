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
  const handleData = async (transactionID) => {
    const transactionsRef = query(collection(db, "transactions"));
    const response = await getDoc(doc(transactionsRef, transactionID));
    const data = response.data();
    const currentTime = await parseInt(Date.now());
    if (!data?.executed || currentTime - data?.date > 90) {
      return;
    }

    

    const usersRef = await doc(db, 'users', data.senderID);
    const userResponse = await getDoc(usersRef).data();
    console.log(userResponse.mediciCredit - data.amount);
    await updateDoc(usersRef, {
      mediciCredit: userResponse.mediciCredit - data.amount,
    });
    await updateDoc(transactionsRef, {
      executed: true,
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
