import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BillDetails from "./billDetails";
import { getSalesBills } from "../../dbConnection/salesManagement";
export default function Bills() {
  const [bills, setBills] = useState("");
  useEffect(() => {
    getSalesBills(setBills);
  },[]);
  return (
    <div>
      {bills.length > 0 ? (
        <>
          <h1>Bills</h1>
          <Table hover striped="columns">
            <thead>
              <tr>
                <th>billN</th>
                <th>Client</th>
                <th>date</th>
                <th>total</th>
                <th>status</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.billNbr}>
                  <td>{bill.billNbr}</td>
                  <td>{bill.client}</td>
                  <td>{bill.date}</td>
                  <td>{bill.totalPrice}</td>
                  <td style={bill.status ===1 ? {backgroundColor:'lightgreen'} : {backgroundColor:'red'} } > {bill.status ===1 ? 'payed' : 'unpayed'} </td>
                  <td>
                    {" "}
                    <BillDetails billNbr={bill.billNbr} provider={bill.provider} totalPrice={bill.totalPrice} status={bill.status} date={bill.date} time={bill.time} currency={bill.currency} /> 
                    {" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h1>Make a new purchase</h1>
      )}
    </div>
  );
}
