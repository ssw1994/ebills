import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import billService from "../../Services/bill.service";
import "./AddBillForm.scss";
export default function AddBillForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [billingForm, updateForm] = useState({
    billDate: "",
    paidDate: "",
    unitConsumed: 0,
    amount: 0,
  });

  useEffect(() => {
    if (params.id) {
      billService
        .getBillDetail(params.id)
        .then((response) => {
          if (response.status === 200) {
            const details = response.data;
            updateForm({
              ...response.data,
              billDate: new Date(details.billDate)
                .toISOString()
                .substring(0, 10),
              paidDate: new Date(details.paidDate)
                .toISOString()
                .substring(0, 10),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  const updateValue = (event) => {
    const updatedForm = {
      ...billingForm,
      [event.target.name]: event.target.value,
    };
    updateForm(updatedForm);
  };

  const addBill = () => {
    if (params.id) {
      billService.updateBill(billingForm).then((response) => {
        if (response.status == 200) {
          cancel();
        } else {
          alert("error in saving");
        }
      });
    } else {
      billService.addBill(billingForm).then((response) => {
        if (response.status == 200) {
          cancel();
        } else {
          alert("error in saving");
        }
      });
    }
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <div className="billing-form-container">
      <div className="billing-form">
        <label style={{ fontWeight: "bolder", fontSize: "24px" }}>
          {params.id ? "Update Bill" : "Add Bill"}
        </label>
        <div className="input-control">
          <label>Bill Date</label>
          <input
            placeholder="Bill Date"
            type="date"
            id="billDate"
            name="billDate"
            value={billingForm.billDate}
            onChange={updateValue}
          ></input>
        </div>
        <div className="input-control">
          <label>Paid Date</label>
          <input
            placeholder="Paid Date"
            type="date"
            min={billingForm.billDate}
            id="paidDate"
            name="paidDate"
            value={billingForm.paidDate}
            onChange={updateValue}
          ></input>
        </div>
        <div className="input-control">
          <label>Unit Consumed</label>

          <input
            placeholder="Unit Consumed"
            type="number"
            id="unitConsumed"
            name="unitConsumed"
            value={billingForm.unitConsumed}
            onChange={updateValue}
          ></input>
        </div>
        <div className="input-control">
          <label>Bill Amount</label>

          <input
            placeholder="Amount"
            type="number"
            id="amount"
            name="amount"
            value={billingForm.amount}
            onChange={updateValue}
          ></input>
        </div>
        <div className="action-controls">
          <button onClick={cancel}>Cancel</button>
          <button onClick={addBill}>{params.id ? "Update" : "Add"} Bill</button>
        </div>
      </div>
    </div>
  );
}
