import React from "react";
import { ProductConsumer } from "../context";
import RiderTableView from "./tableview/riderTable";
import "./navbar.css";

function Rider() {
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
              <h1>Riders</h1>

              <div className="row">
                <div className="col-2">#</div>
                <div className="col-2">Name</div>
                <div className="col-2">Phone</div>
                <div className="col-2">CNIC</div>
                <div className="col-2">License</div>
                <div className="col-2">Delete</div>
              </div>
              {value.riders !== undefined
                ? value.riders.map((item, index) => (
                    <RiderTableView key={index} rider={item} />
                  ))
                : null}
            </div>
          );
        }}
      </ProductConsumer>
    </div>
  );
}

export default Rider;
