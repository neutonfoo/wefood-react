import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();

  const [activeNav, setActiveNav] = useState();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveNav("NewPoll");
    } else if (location.pathname === "/history") {
      setActiveNav("History");
    } else if (location.pathname === "/credits") {
      setActiveNav("Credits");
    } else if (location.pathname === "/join") {
      setActiveNav("Join");
    } else if (location.pathname.startsWith("/vote")) {
      setActiveNav("Join");
    } else if (location.pathname.startsWith("/view")) {
      setActiveNav("History");
    }
  }, [location.pathname]);

  function handleNavLinkClick(newActiveNav) {
    setActiveNav(newActiveNav);
  }

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container narrow-container">
        <Link to="/" className="navbar-brand">
          WeFood
        </Link>
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
            <li
              className={`nav-item ${activeNav === "Credits" ? "active" : ""}`}
            >
              <Link
                className="nav-link"
                to="/credits"
                onClick={() => handleNavLinkClick("Credits")}
              >
                Credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
