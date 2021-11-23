import React from "react";
import axios from "axios";
import "../navbar.css";

function CustomerTabelView({ customer, key }) {
  const deleteCustomer = (id) => {
    axios
      .delete(`/admin/delete/customer/${id}`)
      .then((res) => console.log(res));
  };
  return (
    <div style={{ padding: "5px", margin: "20px" }}>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-md-3">{customer._id}</div>
        <div className="col-md-3">{customer.name}</div>
        <div className="col-md-3">{customer.phone}</div>
        <div className="col-md-3">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deleteCustomer(customer._id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default CustomerTabelView;
