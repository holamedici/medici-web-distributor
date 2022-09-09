import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import delivery from "../imgs/delivery.png";
import clock from "../imgs/clock.png";
import next from "../imgs/next.png";
import qrcode from "../imgs/qrcode.png";
import invite from "../imgs/invite.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MainDashboard(props) {
  const [data, setData] = useState([
    {
      name: "09/05",
      revenue: 3490,
      amt: 2100,
    },
    {
      name: "09/06",
      revenue: 4000,
      amt: 2400,
    },
    {
      name: "09/07",
      revenue: 3000,
      amt: 2210,
    },
    {
      name: "09/08",
      revenue: 2000,
      amt: 2290,
    },
    {
      name: "09/09",
      revenue: 2780,
      amt: 2000,
    },
    {
      name: "09/10",
      revenue: 1890,
      amt: 2181,
    },
    {
      name: "09/11",
      revenue: 2390,
      amt: 2500,
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
        <Link to="/dashboard/analytics" className="noDecoration">
          <div className="genWidgetInner  blackText">
            <div className="absoluteArrow">
              <img src={next} className="img" alt="arrow" />
            </div>
            <p className="genSmallSubtitle noMargin">Today</p>
            <p className="largeTitle  midTextWeight noMargin">$2,600</p>
            <div className="bottomBorder" />
            <div className="justifyBetween">
              <div className="leftSideWidgetIcon row justifyHorizontal">
                <img src={delivery} alt="deliver" className="imgHeight" />
                <span className="genSubtitle smallLeftPadding">
                  14 Deliveries
                </span>
              </div>
              <div className="leftSideWidgetIcon row justifyHorizontal">
                <img src={clock} alt="clock" className="imgHeight" />{" "}
                <span className="genSubtitle smallLeftPadding">00:00</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="row widgetPadding">
        <div className="left50">
          <div className="genWidget">
            <Link to="/dashboard/camera" className="noDecoration">
              <div className="genWidgetInner  blackText">
                <div className="absoluteArrow">
                  <img src={next} className="img" alt="arrow" />
                </div>
                <div className="widgetQRInviteImgDiv">
                  <img src={qrcode} className="img" alt="invite" />
                </div>
                <p className="geSmallBold noMargin smallLeftPadding smallTopPadding">
                  Scan QR Code
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="right50">
          <div className="genWidget">
            <Link to="/dashboard/invite" className="noDecoration">
              <div className="genWidgetInner  blackText">
                <div className="absoluteArrow">
                  <img src={next} className="img" alt="arrow" />
                </div>
                <div className="widgetQRInviteImgDiv">
                  <img src={invite} className="img" alt="invite" />
                </div>
                <p className="geSmallBold noMargin smallLeftPadding smallTopPadding">
                  Invite
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="genWidget">
          <div className="genWidgetInner  blackText">

            <p className="genSmallSubtitle noMargin">Weekly Total</p>
            <p className="genTitle  midTextWeight noMargin">$29,940</p>
            <div className="bottomBorder" />
            <div style={{ width: "100%", height: "300px", marginTop: "30px" }}>
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart width={150} height={40} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#fa5943" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
}
