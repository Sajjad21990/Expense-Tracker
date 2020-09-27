import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

const IncomeHistory = ({
  handleClick,
  handleDeleteClick,
  amount,
  description,
  index,
}) => {
  return handleClick ? (
    <div className="income-transaction-history">
      <div className="single-income-history" onClick={handleClick}>
        <p>{description}</p>
        <p>&#8377; {amount}</p>
      </div>
      <div className="delete-icon">
        <DeleteOutlined
          style={{ fontSize: "1.5rem", color: "red" }}
          onClick={() => handleDeleteClick(index)}
        />
      </div>
      {/* <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal> */}
    </div>
  ) : null;
};

export default IncomeHistory;
