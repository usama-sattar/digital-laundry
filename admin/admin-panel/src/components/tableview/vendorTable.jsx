import React from "react";
import axios from "axios";
import "../navbar.css";

function VendorTabelView({ vendor, key }) {
  const deleteVendor = (id) => {
    axios.delete(`/vendors/delete/${id}`).then((res) => console.log(res));
  };
  return (
    <div>
      <div className="row">
        <div className="col-3">{vendor._id}</div>
        <div className="col-2">{vendor.name}</div>
        <div className="col-3">{vendor.phone}</div>
        <div className="col-2">{vendor.cnic}</div>

        <div className="col-2">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteVendor(vendor._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default VendorTabelView;
