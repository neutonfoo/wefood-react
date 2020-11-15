import React, { useState, useEffect } from "react";

export default function Spinner({ children }) {
  return (
    <div
      className="text-center mx-auto my-3 text-secondary"
      data-test="spinner"
    >
      <div className="spinner-border" role="status"></div>
      <p className="small">{children}</p>
    </div>
  );
}
