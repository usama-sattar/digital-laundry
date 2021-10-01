import React from "react";
import axios from "axios";
import "../navbar.css";

function RatingTabelView({ rating, key }) {
  return (
    <div>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-md-4">{rating._id}</div>
        <div className="col-md-4">{rating.user}</div>
        <div className="col-md-4">{rating.rating}</div>
      </div>
    </div>
  );
}

export default RatingTabelView;
