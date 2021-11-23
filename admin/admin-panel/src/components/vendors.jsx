import React from "react";
import { ProductConsumer } from "../context";
import VendorTableView from "./tableview/vendorTable";
import SearchField from "react-search-field";
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
                    value.searchItem(value.vendors, event, "vendor")
                  }
                  onSearchClick={(event) =>
                    value.searchItem(value.vendors, event, "vendor")
                  }
                />
              </div>
              <div style={{ padding: "10px", margin: "20px" }}>
                <div className="row">
                  <div className="col-3">#</div>
                  <div className="col-2">Name</div>
                  <div className="col-3">Phone</div>
                  <div className="col-2">CNIC</div>
                  <div className="col-2">Delete</div>
                </div>
              </div>
              {value.searchVendor.length > 0 ? (
                <div>
                  <h2>Searched Vendor</h2>
                  {value.searchVendor.map((item, index) => (
                    <VendorTableView key={index} vendor={item} />
                  ))}
                </div>
              ) : null}
              <h2>All Vendors</h2>
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
