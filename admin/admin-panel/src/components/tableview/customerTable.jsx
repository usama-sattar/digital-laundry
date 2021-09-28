import React from "react";
import axios from "axios";
import "../navbar.css";

function TabelView({ customer, key }) {
  const deleteCustomer = (id) => {
    axios.delete(`/customers/delete/${id}`).then((res) => console.log(res));
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3">{customer._id}</div>
        <div className="col-md-3">{customer.name}</div>
        <div className="col-md-3">{customer.phone}</div>
        <div className="col-md-3">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteCustomer(customer._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default TabelView;
