import React from "react";
import { ProductConsumer } from "../context";
import RatingTableView from "./tableview/ratingTable";
import "./navbar.css";

function Rating() {
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div
            className={
              value.sideBar ? "customerContainer" : "customerContainer active"
            }
          >
            <h1>App Rating</h1>

            <div className="row">
              <div className="col-4">#</div>
              <div className="col-4">user#</div>
              <div className="col-4">Rating</div>
            </div>

            {value.ratings !== undefined
              ? value.ratings.map((item, index) => (
                  <RatingTableView key={index} rating={item} />
                ))
              : null}
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Rating;
