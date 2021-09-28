import React from "react";
import { ProductConsumer } from "../context";
import TableView from "./tableview/customerTable";
import "./navbar.css";

function Customer() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Customers</h1>

            <div className="row">
              <div className="col-3">#</div>
              <div className="col-3">Name</div>
              <div className="col-3">Phone</div>
              <div className="col-3">Delete</div>
            </div>

            {value.customers !== undefined
              ? value.customers.map((item, index) => (
                  <TableView key={index} customer={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Customer;
