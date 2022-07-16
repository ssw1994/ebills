import React from "react";
import { useNavigate } from "react-router-dom";
import billService from "../../Services/bill.service";
import "./BillRow.scss";
export default function BillRow({ billDetails, refreshBills }) {
  const navigate = useNavigate();
  const { billDate, paidDate, unitConsumed, amount, _id } = billDetails;
  const editBill = () => {
    navigate(`/edit/${_id}`);
  };

  const deleteBill = () => {
    billService.deleteBill(billDetails).then((response) => {
      if (response.status === 200) {
        refreshBills();
      }
    });
  };

  const formatDate = (iDate) => {
    const date = new Date(iDate);
    return `${date.getDate()}-${date.getMonth()}-${date.getYear()}`;
  };

  return (
    <tr className="bill-row">
      <td>{formatDate(billDate)}</td>
      <td>{formatDate(paidDate)}</td>
      <td>{unitConsumed}</td>
      <td>{amount}</td>
      <td>
        <button onClick={editBill}>Edit</button>
        <button onClick={deleteBill}>Delete</button>
      </td>
    </tr>
  );
}
