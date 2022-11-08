import * as React from "react";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {  styled } from "@mui/material/styles";

const TextFieldMed = styled(TextField)({
  "& label.Mui-focused": {
    color: "#414141",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#414141",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#414141",
    },
    "&:hover fieldset": {
      borderColor: "#414141",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#414141",
    },
  },
});


const ButtonMed = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 31px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#FA5943',
  borderColor: '#FA5943',
  color: '#ffffff',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#ce3d2a',
    borderColor: '#ce3d2a',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#FA5943',
    borderColor: '#FA5943',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("Please complete the form.");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSignIn = () => {
    if(email === "" || password ===""){
      setFeedback("Please enter a valid Email or Password.")
      return
    }
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
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
         setFeedback("Please check your Password");
        }
        if (error.code === "auth/user-not-found") {
          setFeedback("Account not found, register below");
        }
        if (error.code === "auth/invalid-email") {
          setFeedback("Invalid Email");
        }
      });
  };
  return (
    <div className="fullscreenCenter">
      <div className="loginWidget">
        <div className="loginInner">
          <div className="loginHeader">
            <h3 className="genTitle mediciRedText noMargin">Login</h3>
            <p className="genSubtitle noMargin">Sign in to continue.</p>

          </div>
          <div className="textFieldDiv">

            <TextFieldMed
              id="email"
              label="Email"
              variant="outlined"
              className="textField"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textFieldDiv">
            <TextFieldMed
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              className="textField"
              onChange={(e) => setPassword(e.target.value)}
              hiddenLabel
            />
          </div>
          <p className="genSmallSubtitle feedbackText">{feedback}</p>
          <ButtonMed onClick={handleSignIn} >Login</ButtonMed>
          <br />
          <br />
          <Link to="/register" className="genLinkGrey">
            <span className="mediciGreyText ">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
