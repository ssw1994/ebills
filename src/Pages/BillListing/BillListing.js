import React, { useState, useEffect } from "react";
import BillRow from "../../Components/BillRow/BillRow";
import { useNavigate } from "react-router-dom";
import "./BillListing.scss";
import billService from "../../Services/bill.service";
export default function BillListing() {
  const navigate = useNavigate();
  const [allBills, setBills] = useState([]);

  const fetchBills = () => {
    billService.getBills().then((response) => {
      if (response.status == 200) {
        setBills(response.data.bills);
      }
    });
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const addNewBill = () => {
    navigate("/addBill");
  };
  return (
    <div className="table-container">
      <div>
        <label className="total-bills">Total Bills : {allBills?.length}</label>
        {allBills?.length > 0 ? (
          <table
            style={{ display: "block", height: "600px", overflow: "auto" }}
          >
            <thead style={{ position: "sticky", top: "0" }}>
              <tr>
                <th>Bill Date</th>
                <th>Paid Date</th>
                <th>Unit Consumed</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allBills?.map((bill) => {
                return <BillRow billDetails={bill} refreshBills={fetchBills} />;
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <label>No Bills found</label>
          </div>
        )}
        <button onClick={addNewBill}>Add New Bill</button>
      </div>
    </div>
  );
}
