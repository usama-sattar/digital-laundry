import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";

function Order() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Orders</h1>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Order;
