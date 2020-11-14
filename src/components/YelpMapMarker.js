import React from "react";

export default function YelpMapMarker({ name = "You", isUser = false }) {
  return (
    <div style={({ width: "100px" }, { transform: "translate(-50%, -100%)" })}>
      <i
        className={`fas fa-3x ${
          isUser ? "fa-map-pin text-primary" : "fa-map-marker-alt text-danger"
        }`}
      ></i>
      <h6>
        <span className="badge badge-light border border-danger p-1">
          {name}
        </span>
      </h6>
    </div>
  );
}
