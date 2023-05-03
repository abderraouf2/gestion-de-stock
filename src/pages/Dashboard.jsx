import React, { useState, useEffect } from "react";
import Clients from "../data/clients";
import Providers from "../data/providers";
import Products from "../data/products";

import { getProviders } from "../dbConnection/providersManagement";
import { getClients } from "../dbConnection/clientsManagement";
import { getProducts } from "../dbConnection/productsManagement";
import Card from "../components/Card";
import cards from "./cards";
import { Link } from "react-router-dom";
export default function Dashboard(props) {
  const [providers, setProviders] = useState(Providers);
  const [clients, setClients] = useState(Clients);
  const [products, setProducts] = useState(Products);

  useEffect(() => {
    getProviders(setProviders);
    getClients(setClients);
    getProducts(setProducts);
  }, []);

  let [clientsCounter, setClientsCounter] = useState(0);
  let [providersCounter, setProvidersCounter] = useState(0);
  let [productsCounter, setProductsCounter] = useState(0);
  let timer1;
  let timer2;
  let timer3;
  useEffect(() => {
    if (clients.length == 0) {
      setClientsCounter(0);
      return;
    }
    clearInterval(timer1);
    timer1 = setInterval(() => {
      if (clientsCounter === clients.length) {
        clearInterval(timer1);
        return;
      }
      setClientsCounter((prev) => prev + 1);
      clientsCounter++;
    }, 100);

    return () => clearInterval(timer1);
  }, [clientsCounter]);

  useEffect(() => {
    if (providers.length == 0) {
      setProvidersCounter(0);
      return;
    }

    clearInterval(timer2);
    timer2 = setInterval(() => {
      if (providersCounter === providers.length) {
        clearInterval(timer2);
        return;
      }
      setProvidersCounter((prev) => prev + 1);
      providersCounter++;
    }, 100);

    return () => clearInterval(timer2);
  }, [providersCounter]);
  useEffect(() => {
    if (products.length == 0) {
      setProductsCounter(0);
      return;
    }
    clearInterval(timer3);
    timer3 = setInterval(() => {
      if (productsCounter === products.length) {
        clearInterval(timer3);
        return;
      }
      setProductsCounter((prev) => prev + 1);
      productsCounter++;
    }, 100);

    return () => clearInterval(timer3);
  }, [productsCounter]);

  return (
    <div
      style={{
        height: "90vh",
        width: "90vw",
        paddingTop: "1%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "90vw",
          height: "15vh",
          marginBottom: "3vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            backgroundColor: "#191D32",
            color: "white",
            height: "100%",
            width: "30vw",
            margin: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Clients: </h3>
          <h1> {clientsCounter} </h1>
        </div>
        <div
          style={{
            backgroundColor: "#191D32",
            color: "white",
            height: "100%",
            width: "30vw",
            margin: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>suppliers: </h3>
          <h1> {providersCounter} </h1>
        </div>
        <div
          style={{
            backgroundColor: "#191D32",
            color: "white",
            height: "100%",
            width: "30vw",
            margin: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Products: </h3>
          <h1> {productsCounter} </h1>
        </div>
      </div>
      <div style={{ width: "90vw", display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: "45vw",
            height: "50vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              setEventKey={props.setEventKey}
              image={card.image}
              link={card.link}
              title={card.title}
            />
          ))}
        </div>
        <div
          style={{
            width: "45vw",
            height: "70vh",
            border: "2px solid black",
          }}
        >
          <h5>statistics</h5>
        </div>
      </div>
    </div>
  );
}
