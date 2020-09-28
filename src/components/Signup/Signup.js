import React, { useState } from "react";
import Title from "../Title";
import { Input, Button, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeTwoTone,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
import firebase from "firebase";
import db, { auth, provider } from "../../firebase";
import "./Signup.css";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [cnfPswd, setCnfPswd] = useState("");

  const handleSignup = (authType, data) => {
    if (authType === "email") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.pswd)
        .then((response) => {
          var userObj = {
            email: response.user.email,
            name: data.name,
            totalBalance: 0,
            totalIncome: 0,
            totalExpense: 0,
            transactionData: [],
          };
          db.collection("users")
            .doc(response.user.email)
            .set(userObj)
            .then(() => {
              props.history.push("/home");
              message.success("signup successful");
            })
            .catch((e) => console.log(e));
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
                message.success("signup successful");
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
    <div className="signup-container">
      <Title title="SIGN UP" />
      <div className="signup-form-container">
        <Input
          size="large"
          placeholder="Enter your name"
          prefix={<UserOutlined />}
          className="inpu"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setCnfPswd(e.target.value)}
        />
        <Button
          type="primary"
          style={{ fontWeight: "600", borderRadius: "15px", height: "5vh" }}
          onClick={() => handleSignup("email", { name, email, pswd, cnfPswd })}
        >
          Signup
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
          onClick={() => handleSignup("google", {})}
        >
          Signup with Google
        </Button>
        <Link to="/">
          <h3
            style={{
              color: "white",
              border: "1px solid white",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Already have account, SignIn here...
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Signup);
