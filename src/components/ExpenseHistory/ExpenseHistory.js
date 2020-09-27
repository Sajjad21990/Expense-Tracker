import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

const ExpenseHistory = ({
  handleClick,
  handleDeleteClick,
  amount,
  description,
  index,
}) => {
  return (
    <div className="expense-transaction-history">
      <div className="single-expense-history">
        <p>{description}</p>
        <p>&#8377; {amount}</p>
      </div>
      <div className="delete-icon">
        <DeleteOutlined
          style={{ fontSize: "1.5rem", color: "red" }}
          onClick={() => handleDeleteClick(index)}
        />
      </div>
    </div>
  );
};

export default ExpenseHistory;
