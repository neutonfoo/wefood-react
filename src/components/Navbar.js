import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("NewPoll");

  function handleNavLinkClick(newActiveNav) {
    setActiveNav(newActiveNav);
  }

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container narrow-container">
        <a className="navbar-brand" href="#">
          WeFood
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${activeNav === "NewPoll" ? "active" : ""}`}
            >
              <Link
                className="nav-link"
                to="/"
                onClick={() => handleNavLinkClick("NewPoll")}
              >
                New Poll
              </Link>
            </li>
            <li className={`nav-item ${activeNav === "Join" ? "active" : ""}`}>
              <Link
                className="nav-link"
                to="/join"
                onClick={() => handleNavLinkClick("Join")}
              >
                Join
              </Link>
            </li>{" "}
            <li
              className={`nav-item ${activeNav === "History" ? "active" : ""}`}
            >
              <Link
                className="nav-link"
                to="/history"
                onClick={() => handleNavLinkClick("History")}
              >
                History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
