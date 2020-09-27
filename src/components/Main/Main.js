import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { withRouter } from "react-router";
import IncomeNExpenses from "../Income&Expenses/IncomeNExpenses";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import "./Main.css";
import Title from "../Title";
import firebase from "firebase";

const Main = (props) => {
  const { handleNameChange } = props;

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      handleNameChange(user.displayName);
      firebase
        .firestore()
        .collection("users")
        .doc(user.email)
        .get()
        .then((doc) => {
          const __data = doc.data();
          setTransactionData(__data.transactionData);
          setTotalIncome(__data.totalIncome);
          setTotalExpense(__data.totalExpense);
          setTotalBalance(__data.totalBalance);
          // console.log(__data.transactionData);
        })
        .catch((err) => console.log(err));
    } else {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const updateIncome = (data) => {
    const user = firebase.auth().currentUser;
    // console.log(data);
    let totalAmt = totalIncome + data.amount;
    let totalBal = totalBalance + data.amount;
    let transData = [...transactionData, data];
    setTransactionData(transData);
    setTotalIncome((prevState) => prevState + data.amount);
    setTotalBalance(totalBal);

    firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .update({
        totalIncome: totalAmt,
        totalBalance: totalBal,
        transactionData: transData,
      })
      .then(() => console.log("done"))
      .catch((err) => console.log(err));
  };

  const updateExpense = (data) => {
    const user = firebase.auth().currentUser;
    // console.log(data);
    let totalAmt = totalExpense + data.amount;
    let totalBal = totalBalance - data.amount;
    let transData = [...transactionData, data];
    setTransactionData(transData);
    setTotalExpense((prevState) => prevState + data.amount);
    setTotalBalance(totalBal);

    firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .update({
        totalExpense: totalAmt,
        totalBalance: totalBal,
        transactionData: transData,
      })
      .then(() => console.log("done"))
      .catch((err) => console.log(err));
  };

  const handleDelete = (index) => {
    const user = firebase.auth().currentUser;

    let data = transactionData[index];
    if (data.type === "income") {
      let newIncomeAmt = totalIncome - data.amount;
      let newBalance = totalBalance - data.amount;
      setTotalIncome((prevState) => prevState - data.amount);
      setTotalBalance(newBalance);
      let newArr = transactionData;
      newArr.splice(index, 1);
      setTransactionData(newArr);
      firebase
        .firestore()
        .collection("users")
        .doc(user.email)
        .update({
          totalIncome: newIncomeAmt,
          totalBalance: newBalance,
          transactionData: newArr,
        })
        .then(() => console.log("done"))
        .catch((err) => console.log(err));
    } else {
      let newExpenseAmt = totalExpense - data.amount;
      let newBalance = totalBalance + data.amount;
      setTotalExpense((prevState) => prevState - data.amount);
      setTotalBalance(newBalance);
      let newArr = transactionData;
      newArr.splice(index, 1);

      setTransactionData(newArr);
      firebase
        .firestore()
        .collection("users")
        .doc(user.email)
        .update({
          totalExpense: newExpenseAmt,
          totalBalance: newBalance,
          transactionData: newArr,
        })
        .then(() => console.log("done"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="main-container">
      <Title title="EXPENSE TRACKER" />
      <div className="balanceContainer">
        <h1>Your Balance</h1>
        <h3>&#8377; {totalBalance}</h3>
      </div>
      <IncomeNExpenses
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        updateIncome={updateIncome}
        updateExpense={updateExpense}
      />
      <TransactionHistory data={transactionData} handleDelete={handleDelete} />
      {/* <div className="pending-transaction">
        <Button
          ghost
          style={{
            color: "#ffeb00",
            border: "1px solid #ffeb00",
            marginBottom: "10px",
          }}
          onClick={() => props.history.push("/pending-transactions")}
        >
          Pending Transactions
        </Button>
      </div> */}
    </div>
  );
};

export default withRouter(Main);
