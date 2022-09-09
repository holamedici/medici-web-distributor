import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Common/Button";

export default function Login(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSignIn = () => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        props.setUser(response.user);
        console.log(response);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        props.setToken(true);
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
  };
  return (
    <div className="loginWidget">
      <div className="heading-container">
        <h3 className="genTitle">Please Login</h3>
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
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          hiddenLabel
        />
      </Box>

   
      <Button title="Login" handleAction={handleSignIn} />
      <br />
      <br />
      <Link to="/register">
        <span>Register</span>
      </Link>
    </div>
  );
}
