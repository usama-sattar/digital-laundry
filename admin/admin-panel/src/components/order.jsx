import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";
import OrderTableView from "./tableview/orderTable";

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
            <div style={{ padding: "10px", margin: "20px" }}>
              <div className="row">
                <div className="col-3">#</div>
                <div className="col-2">Vendor</div>
                <div className="col-2">Name</div>
                <div className="col-1 ">Total</div>
                <div className="col-3">Cart</div>
              </div>
            </div>
            {value.orders !== undefined
              ? value.orders.map((item, index) => (
                  <OrderTableView key={index} order={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Order;
