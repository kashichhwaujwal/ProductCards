import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <div className="navContainer">
      <div className="navContainer__icons">
        <Link to="/" className="navContainer__link">
          <AiOutlineHome />
        </Link>
      </div>
      <div className="navContainer__icons">
        <Link to="products" className="navContainer__link">
          <RiFileList2Line />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;
