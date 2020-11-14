import React from "react";

export default function YelpMapMarker({ name = "You", isUser = false }) {
  return (
    <div style={({ width: "100px" }, { transform: "translate(-50%, -100%)" })}>
      <i
        className={`fas fa-map-marker-alt fa-3x ${
          isUser ? "text-primary" : "text-danger"
        }`}
      ></i>
      <p className="h6">
        <span className="badge badge-light border border-danger">{name}</span>
      </p>
    </div>
  );
}
