import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import next from "../imgs/next.png";


export default function AnalyticsDashboard(props) {
  const [data, setData] = useState([
    {
      sender: "Juan Caramillo",
      volume: 250,
      time: "09/08",
      store: "Abarrotes Caramillo",
    },
    {
      sender: "Juan Caramillo",
      volume: 320,
      time: "09/04",
      store: "Abarrotes Caramillo",
    },
    {
      sender: "Juan Caramillo",
      volume: 250,
      time: "09/01",
      store: "Abarrotes Caramillo",
    },
    {
      sender: "Juan Caramillo",
      volume: 250,
      time: "08/28",
      store: "Abarrotes Caramillo",
    },
  ]);
  console.log(setData);
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
          <div className="absoluteArrow">
            <img src={next} className="img" alt="arrow" />
          </div>
          <p className="genSmallSubtitle noMargin">Analytics</p>
          <p className="genTitle  midTextWeight noMargin">Past Transactions</p>
          <div className="bottomBorder" />
          <div>
            {data.map((transaction) => (
              <div className="transactionWidget row justifyBetween">
                <div>
                  <p className="smallTitle blackText">{transaction.sender}</p>
                  <p className="genSubtitle blackText noMargin">
                    {transaction.store}
                  </p>
                </div>

                <div>
                  <p className="smallTitle blackText">+ {transaction.volume}</p>
                  <p className="genSubtitle blackText noMargin">
                    {transaction.time}
                  </p>
                </div>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
