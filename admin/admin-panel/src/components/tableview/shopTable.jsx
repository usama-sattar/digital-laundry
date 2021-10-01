import React from "react";
import axios from "axios";
import "../navbar.css";

function ShopTable({ shop, key }) {
  const deleteShop = (id) => {
    console.log(id);
    axios.delete(`/shop/delete/${id}`).then((res) => console.log(res));
  };

  return (
    <div>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="col-3">{shop._id}</div>
        <div className="col-3">{shop.name}</div>
        <div className="col-3">
          {shop.services !== undefined
            ? shop.services.map((item) => {
                return (
                  <div style={{ display: "inline" }}>
                    <ul>
                      <li>{item.title}</li>
                      <li>{item.price}</li>
                    </ul>
                  </div>
                );
              })
            : null}
        </div>
        <div className="col-3">
          <i
            className="fas fa-trash"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteShop(shop._id)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ShopTable;
