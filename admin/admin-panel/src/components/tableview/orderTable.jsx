import React from "react";
import axios from "axios";
import "../navbar.css";

function OrderTableView({ order, key }) {
  const deleteOrder = (id) => {
    axios.delete(`/customers/delete/${id}`).then((res) => console.log(res));
  };
  return (
    <div>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-md-3">{order._id}</div>
        <div className="col-md-2">{order.vendor}</div>
        <div className="col-md-2">{order.name}</div>
        <div className="col-md-1">{order.total}</div>
        <div className="col-md-3">
          {order.cart !== undefined
            ? order.cart.map((item) => {
                return (
                  <div style={{ display: "inline" }}>
                    <ul>
                      <li>{item.name}</li>
                      <li>{item.price}</li>
                    </ul>
                  </div>
                );
              })
            : null}
        </div>
        <div className="col-md-1">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteOrder(order._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default OrderTableView;
