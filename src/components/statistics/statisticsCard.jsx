import React, { useState } from "react";
import { useEffect } from "react";
import { getBills } from "../../dbConnection/purchasemanagement";
import { getSalesBills } from "../../dbConnection/salesManagement";
import styles from "./statisticsCard.module.css";
export default function StatisticsCard() {
  const [bills, setBills] = useState([]);
  const [dept, setDept] = useState(0);
  const [payedPruchases, setPayedPruchases] = useState(0);
  const [income, setIncome] = useState(0);
  const [salesBills, setSalesBills] = useState([]);
  useEffect(() => {
    getBills(setBills);
    getSalesBills(setSalesBills);
  }, []);

  useEffect(() => {
    setDept(
      bills
        .filter((bill) => bill.status === 0)
        .reduce((accumulator, current) => accumulator + current.totalPrice, 0)
    );
    setPayedPruchases(
      bills
        .filter((bill) => bill.status === 1)
        .reduce((accumulator, current) => accumulator + current.totalPrice, 0)
    );
    setIncome(
      salesBills
        .filter((bill) => bill.status === 1)
        .reduce((accumulator, current) => accumulator + current.totalPrice, 0)
    );
  }, [bills, salesBills]);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <h4 style={{ textAlign: "left" }}> Total unpayed purchases:</h4>
        <h1> {dept} DZD </h1>
      </div>
      <div className={styles.card}>
        <h4 style={{ textAlign: "left" }}> Total payed purchases:</h4>
        <h1> {payedPruchases} DZD </h1>
      </div>

      <div className={styles.card}>
        <h4 style={{ textAlign: "left" }}> Total Income:</h4>
        <h1> {income} DZD </h1>
      </div>
    </div>
  );
}
