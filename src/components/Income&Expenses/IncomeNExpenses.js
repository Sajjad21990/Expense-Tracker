import React, { useState } from "react";
import { Button, Modal, InputNumber, Input, Row, Col } from "antd";
import "./IncomeNExpenses.css";

const IncomeNExpenses = (props) => {
  const [incomeModal, setIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState(10);
  const [incomeDescription, setIncomeDescription] = useState(
    "some transaction"
  );
  const [expenseAmount, setExpenseAmount] = useState(10);
  const [expenseDescription, setExpenseDescription] = useState(
    "some transaction"
  );

  const { totalIncome, totalExpense, updateIncome, updateExpense } = props;

  const handleAddIncome = () => {
    console.log(incomeAmount);
    setLoading(true);
    const data = {
      type: "income",
      amount: incomeAmount,
      description: incomeDescription,
    };

    updateIncome(data);

    setTimeout(() => {
      setLoading(false);
      setIncomeModal(false);
    }, 1000);
  };

  const handleAddExpense = () => {
    console.log(expenseAmount);
    setLoading(true);

    const data = {
      type: "expense",
      amount: expenseAmount,
      description: expenseDescription,
    };

    updateExpense(data);

    setTimeout(() => {
      setLoading(false);
      setExpenseModal(false);
    }, 1000);
  };

  return (
    <div className="income-expenses">
      <center>
        <div className="income">
          <h2>Income</h2>
          <p>+ &#8377; {totalIncome}</p>
          <Button
            type="primary"
            ghost
            style={{ color: "limegreen", border: "1px solid limegreen" }}
            onClick={() => setIncomeModal(true)}
          >
            Add Income
          </Button>
          <Modal
            visible={incomeModal}
            title="Add Income"
            onOk={handleAddIncome}
            onCancel={() => setIncomeModal(false)}
            footer={[
              <Button key="back" onClick={() => setIncomeModal(false)}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleAddIncome}
              >
                Submit
              </Button>,
            ]}
          >
            <Row>
              <Col span={8}>
                <label for="add-income">Enter Amount </label>
              </Col>
              <Col span={8}>
                <InputNumber
                  size="small"
                  id="add-income"
                  onChange={(value) => setIncomeAmount(value)}
                  placeholder="min 10"
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col span={8}>
                <label for="income-description">Enter Description </label>
              </Col>
              <Col span={10}>
                <Input
                  size="small"
                  id="income-description"
                  placeholder=""
                  allowClear
                  onChange={(e) => setIncomeDescription(e.target.value)}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </center>
      <center>
        <div className="expense">
          <h2>Expense</h2>
          <p>- &#8377; {totalExpense}</p>
          <Button
            ghost
            style={{ color: "lightcoral", border: "1px solid lightcoral" }}
            onClick={() => setExpenseModal(true)}
          >
            Add Expense
          </Button>
          <Modal
            visible={expenseModal}
            title="Add Expense"
            onOk={handleAddExpense}
            onCancel={() => setExpenseModal(false)}
            footer={[
              <Button key="back" onClick={() => setExpenseModal(false)}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleAddExpense}
              >
                Submit
              </Button>,
            ]}
          >
            <Row>
              <Col span={8}>
                <label for="add-expense">Enter Amount </label>
              </Col>
              <Col span={5}>
                <InputNumber
                  size="small"
                  id="add-expense"
                  onChange={(value) => setExpenseAmount(value)}
                  placeholder="min 10"
                />
              </Col>
            </Row>

            <br />
            <Row>
              <Col span={8}>
                <label for="expense-description">Enter Description </label>
              </Col>
              <Col span={10}>
                <Input
                  size="small"
                  id="expense-description"
                  placeholder=""
                  allowClear
                  onChange={(e) => setExpenseDescription(e.target.value)}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </center>
    </div>
  );
};

export default IncomeNExpenses;
