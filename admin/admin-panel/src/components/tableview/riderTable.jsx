import React from "react";
import axios from "axios";
import "../navbar.css";

function RiderTabelView({ rider, key }) {
  const deleteRider = (id) => {
    axios.delete(`/admin/delete/rider/${id}`).then((res) => console.log(res));
  };
  return (
    <div style={{ padding: "5px", margin: "20px" }}>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-2">{rider._id}</div>
        <div className="col-2">{rider.name}</div>
        <div className="col-2">{rider.phone}</div>
        <div className="col-2">{rider.cnic}</div>
        <div className="col-2">{rider.license}</div>
        <div className="col-2">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deleteRider(rider._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default RiderTabelView;
