import React from "react";
import { ProductConsumer } from "../context";
import RiderTableView from "./tableview/riderTable";
import "./navbar.css";
import SearchField from "react-search-field";

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
                    value.searchItem(value.riders, event, "rider")
                  }
                  onSearchClick={(event) =>
                    value.searchItem(value.riders, event, "rider")
                  }
                />
              </div>
              <div style={{ padding: "10px", margin: "20px" }}>
                <div className="row">
                  <div className="col-2">#</div>
                  <div className="col-2">Name</div>
                  <div className="col-2">Phone</div>
                  <div className="col-2">CNIC</div>
                  <div className="col-2">License</div>
                  <div className="col-2">Delete</div>
                </div>
              </div>
              {value.searchRider.length > 0 ? (
                <div>
                  <h2>Searched Rider</h2>
                  {value.searchRider.map((item, index) => (
                    <RiderTableView key={index} rider={item} />
                  ))}
                </div>
              ) : null}
              <h2>All Riders</h2>
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
