import React, { useEffect } from "react";
export default function Credits() {
  useEffect(() => {
    document.title = "Credits : WeFood";
  }, []);

  return (
    <>
      <h1 className="text-center">Credits</h1>
      <p className="text-center">
        WeFood was developed for TrojanHacks Fall 2018 and originally written in
        PHP.
      </p>
      <p>
        Client Side Source Code:{" "}
        <a href="https://github.com/neutonfoo/wefood-react">
          https://github.com/neutonfoo/wefood-react
        </a>
        <br />
        Server Side Source Code:{" "}
        <a href="https://github.com/neutonfoo/wefood-server">
          https://github.com/neutonfoo/wefood-server
        </a>
      </p>
    </>
  );
}
