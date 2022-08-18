import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Button from "./Common/Button";

export default function Register(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const mediciCredit = 100;
        const accountType = "distributor";
        const data = {
          id: uid,
          email,
          accountType,
          mediciCredit,
          fullName,
        };
        const usersRef = query(collection(db, "users"));
        setDoc(doc(usersRef, uid), data).then(() => {
          props.setToken(true);
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        });
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error);
        // toast.error(error);
      });
  };

  return (
    <div>
      <div className="heading-container">
        <h3>Register</h3>
      </div>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Full Name"
          variant="outlined"
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          hiddenLabel
        />
      </Box>
      <Link to="/">
        <Button title="Login" />
      </Link>
      <Button title="Register" handleAction={handleRegister} />
    </div>
  );
}
