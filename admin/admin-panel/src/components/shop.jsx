import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";
import ShopTable from "./tableview/shopTable";

function Shop() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>Shops</h1>

            <div className="row">
              <div className="col-3">vendor #</div>
              <div className="col-3">Name</div>
              <div className="col-3">Services</div>
              <div className="col-3">Delete</div>
            </div>

            {value.shops !== undefined
              ? value.shops.map((item, index) => (
                  <ShopTable key={index} shop={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Shop;
