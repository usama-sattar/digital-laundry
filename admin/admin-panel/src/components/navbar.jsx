import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import logo from "./images/logo.png";

function Navbar(props) {
  const [navTop, setTop] = useState(68);

  const navChanges = () => {
    if (window.scrollY >= "20") {
      setTop(0);
    } else {
      setTop(68);
    }
  };
  window.addEventListener("scroll", navChanges);

  return (
    <ProductConsumer>
      {(value) => {
        return (
          <div>
            <div className="nav-bar">
              {!value.sideBar ? (
                <i className="fas fa-bars bar" onClick={value.showSideBar}></i>
              ) : (
                <i className="fas fa-times bar" onClick={value.showSideBar}></i>
              )}
              <Link to="/">
                <img src={logo}></img>
              </Link>
            </div>

            <div
              className={value.sideBar ? "nav-menu active " : "nav-menu "}
              style={{ top: navTop }}
            >
              <ul className="nav-item">
                <li className="nav-text">
                  <Link to="/customers">
                    <i className="fas fa-user-friends"></i>{" "}
                    <span> Customers</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/vendors">
                    <i className="fas fa-store"></i> <span> Vendor</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/riders">
                    <i className="fas fa-biking"></i> <span> Rider</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/shops">
                    <i className="fas fa-store-alt"></i> <span> Shop</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/orders">
                    <i className="fas fa-store-alt"></i> <span> Orders</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link to="/complaints">
                    <i className="fas fa-comments"></i> <span> Complaints</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
}

export default Navbar;
