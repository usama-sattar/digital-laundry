import React, { useState } from "react";
import { ProductConsumer } from "../context";
import CustomerTableView from "./tableview/customerTable";
import "./navbar.css";
import SearchField from "react-search-field";

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
            <div
              style={{
                width: "100%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchField
                placeholder="Search..."
                onEnter={(event) =>
                  value.searchItem(value.customers, event, "customer")
                }
                onSearchClick={(event) =>
                  value.searchItem(value.customers, event, "customer")
                }
              />
            </div>
            <div style={{ padding: "10px", margin: "20px" }}>
              <div className="row">
                <div className="col-3">#</div>
                <div className="col-3">Name</div>
                <div className="col-3">Phone</div>
                <div className="col-3">Delete</div>
              </div>
            </div>

            {value.searchCustomer.length > 0 ? (
              <div>
                <h2>Searched User</h2>
                {value.searchCustomer.map((item, index) => (
                  <CustomerTableView key={index} customer={item} />
                ))}
              </div>
            ) : null}
            <h2>All Customers</h2>
            {value.customers !== undefined
              ? value.customers.map((item, index) => (
                  <CustomerTableView key={index} customer={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Customer;
