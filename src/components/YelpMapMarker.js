import React from "react";

export default function YelpMapMarker({ name }) {
  return (
    <div style={{ width: "100px" }}>
      <i className="fas fa-map-marker-alt fa-3x text-danger"></i>
      <p className="h6">
        <span className="badge badge-light border border-danger">{name}</span>
      </p>
    </div>
  );
}
