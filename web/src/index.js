import React from "react";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
// import ReactDOM from "react-dom/client";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import App from "./App";
// import Code from "./Code";
// import "./index.css";
// const root = ReactDOM.createRoot(
//   document.getElementById("root")
// );
// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}/>
//       <Route path="/code/:code" element={<Code />}/>
//     </Routes>
//   </BrowserRouter>
// );
