import React from "react";
import { ProductConsumer } from "../context";
import VendorTableView from "./tableview/vendorTable";
import "./navbar.css";

function Vendor() {
  return (
    <div>
      <ProductConsumer>
        {(value) => {
          return (
            <div
              className={
                value.sideBar ? "customerContainer" : "customerContainer active"
              }
            >
              <h1>Vendors</h1>

              <div className="row">
                <div className="col-3">#</div>
                <div className="col-2">Name</div>
                <div className="col-3">Phone</div>
                <div className="col-2">CNIC</div>
                <div className="col-2">Delete</div>
              </div>
              {value.vendors !== undefined
                ? value.vendors.map((item, index) => (
                    <VendorTableView key={index} vendor={item} />
                  ))
                : null}
            </div>
          );
        }}
      </ProductConsumer>
    </div>
  );
}

export default Vendor;
