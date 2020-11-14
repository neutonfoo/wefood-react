import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found : WeFood";
  }, []);

  return (
    <>
      <h1 className="text-center">Error 404</h1>
      <p className="text-center">
        The page you are looking for does not exist.
      </p>
    </>
  );
}
