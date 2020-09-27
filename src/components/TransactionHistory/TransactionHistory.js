import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import "./TransactionHistory.css";
import IncomeHistory from "../IncomeHistory/IncomeHistory";
import ExpenseHistory from "../ExpenseHistory/ExpenseHistory";
const { confirm } = Modal;

const TransationHistory = (props) => {
  const { data, handleDelete } = props;

  const handleDeleteTransaction = (index) => {
    confirm({
      title: "Are you sure delete this transaction?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(index);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleIndividualTransaction = () => {
    console.log("clicked");
  };

  return (
    <div className="transaction-history">
      <center>
        <h2>Transaction History</h2>
      </center>
      <div className="transactions">
        {data && data.length > 0
          ? data.map((currentData, index) => {
              if (currentData.type === "income")
                return (
                  <IncomeHistory
                    handleClick={handleIndividualTransaction}
                    handleDeleteClick={handleDeleteTransaction}
                    amount={currentData.amount}
                    description={currentData.description}
                    index={index}
                  />
                );

              if (currentData.type === "expense")
                return (
                  <ExpenseHistory
                    handleClick={handleIndividualTransaction}
                    handleDeleteClick={handleDeleteTransaction}
                    amount={currentData.amount}
                    description={currentData.description}
                    index={index}
                  />
                );
              return null;
            })
          : null}
      </div>
      ;
    </div>
  );
};

export default TransationHistory;
