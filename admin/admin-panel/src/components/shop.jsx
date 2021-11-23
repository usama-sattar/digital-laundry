import React from "react";
import { ProductConsumer } from "../context";
import "./navbar.css";
import ShopTable from "./tableview/shopTable";
import SearchField from "react-search-field";

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
                  value.searchItem(value.shops, event, "shop")
                }
                onSearchClick={(event) =>
                  value.searchItem(value.shops, event, "shop")
                }
              />
            </div>
            <div style={{ padding: "10px", margin: "20px" }}>
              <div className="row">
                <div className="col-3">vendor #</div>
                <div className="col-3">Name</div>
                <div className="col-3">Services</div>
                <div className="col-3">Delete</div>
              </div>
            </div>
            {value.searchShop.length > 0 ? (
              <div>
                <h2>Searched Shop</h2>
                {value.searchShop.map((item, index) => (
                  <ShopTable key={index} shop={item} />
                ))}
              </div>
            ) : null}
            <h2>All Shops</h2>
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
