import React from "react";
import { Link } from "react-router-dom";
import { MenuList } from "../hidden pages/helpers/MenuList";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";
import Navbar from "../components/Navbar";

function Menu() {
  return (
    <>
      <Navbar />

      <div className="menu">
        <h1 className="menuTitle">Services</h1>

        <div className="menuList">
          {MenuList.map((menuItem, index) => (
            <Link
              key={index}
              to={`/${menuItem.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="link-without-underline"
            >
              <MenuItem
                name={menuItem.name}
                image={menuItem.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
