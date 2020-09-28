import React, { useState } from "react";
import Title from "../Title";
import { Input, Button, message } from "antd";
import {
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
import firebase from "firebase";
import db, { auth, provider } from "../../firebase";
import "./Login.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const handleLogin = (authType, data) => {
    if (authType === "email") {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.pswd)
        .then((response) => {
          props.history.push("/home");
          message.success("welcome back");
        })
        .catch((error) => {
          console.log(error);
          message.error(error.code);
        });
    } else {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          let isNewUser = res.additionalUserInfo.isNewUser;

          if (isNewUser) {
            let userObj = {
              email: res.user.email,
              name: res.user.displayName,
              totalBalance: 0,
              totalIncome: 0,
              totalExpense: 0,
              transactionData: [],
            };
            return db
              .collection("users")
              .doc(res.user.email)
              .set(userObj)
              .then(() => {
                props.history.push("/home");
                message.success("welcome back");
              });
          }
          props.history.push("/home");
        })
        .catch((err) => {
          console.log(err);
          message.error(err.code);
        });
    }
  };

  return (
    <div className="login-container">
      <Title title="LOG IN" />
      <div className="login-form-container">
        <Input
          prefix={<MailOutlined />}
          placeholder="Enter your email"
          size="large"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Enter password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setPswd(e.target.value)}
        />
        <Button
          type="primary"
          style={{ fontWeight: "600", borderRadius: "15px", height: "5vh" }}
          onClick={() => handleLogin("email", { email, pswd })}
        >
          Login
        </Button>
        <div
          style={{
            fontWeight: "600",
            color: "white",
            textAlign: "center",
            width: "100%",
            fontSize: "1.5rem",
          }}
        >
          <span
            style={{
              borderRadius: "50%",
              color: "white",
              border: "2px solid white",
              width: "100%",
              padding: "5px",
            }}
          >
            OR
          </span>
        </div>

        <Button
          type="primary"
          danger
          style={{ fontWeight: "600", borderRadius: "15px", height: "5vh" }}
          onClick={() => handleLogin("google", {})}
        >
          Login with Google
        </Button>
        <Link to="/signup">
          <h3
            style={{
              color: "white",
              border: "1px solid white",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Don't have account, SignUp here...
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
