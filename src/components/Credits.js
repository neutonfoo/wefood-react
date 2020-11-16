import React, { useEffect } from "react";
export default function Credits() {
  useEffect(() => {
    document.title = "Credits : WeFood";
  }, []);

  return (
    <>
      <h1 className="text-center">Credits</h1>
      <p className="text-center">
        Originally developed by Juliette Chirol Hill, Cerina da Graca, Kevin
        Yeung and Neuton Foo for TrojanHacks 2018.
      </p>
      <hr />
      <strong>Project Repository</strong>{" "}
      <a
        href="https://github.com/neutonfoo/itp404-final-project"
        rel="noreferrer"
        target="_blank"
      >
        https://github.com/neutonfoo/itp404-final-project
      </a>
      <hr />
      <p>
        <strong>Client Side Source Code</strong>{" "}
        <a
          href="https://github.com/neutonfoo/wefood-react"
          rel="noreferrer"
          target="_blank"
        >
          https://github.com/neutonfoo/wefood-react
        </a>
        <br />
        <strong>Server Side Source Code</strong>{" "}
        <a
          href="https://github.com/neutonfoo/wefood-server"
          rel="noreferrer"
          target="_blank"
        >
          https://github.com/neutonfoo/wefood-server
        </a>
        <hr />
        <strong>Original DevPost</strong>{" "}
        <a
          href="https://devpost.com/software/wefood"
          rel="noreferrer"
          target="_blank"
        >
          https://devpost.com/software/wefood
        </a>
        <br />
        <strong>Original Repository</strong>{" "}
        <a
          href="https://github.com/neutonfoo/wefood"
          rel="noreferrer"
          target="_blank"
        >
          https://github.com/neutonfoo/wefood
        </a>
      </p>
      <hr />
      <p>
        This project is built with{" "}
        <a href="https://getbootstrap.com/" rel="noreferrer" target="_blank">
          Bootstrap
        </a>
        ,{" "}
        <a href="https://fontawesome.com/" rel="noreferrer" target="_blank">
          FontAwesome
        </a>
        ,{" "}
        <a
          href="https://www.yelp.com/developers"
          rel="noreferrer"
          target="_blank"
        >
          Yelp
        </a>
        ,{" "}
        <a
          href="https://www.npmjs.com/package/google-map-react"
          rel="noreferrer"
          target="_blank"
        >
          Google Map React
        </a>{" "}
        from npm and hosted on{" "}
        <a href="https://www.netlify.com/" rel="noreferrer" target="_blank">
          Netlify
        </a>{" "}
        and{" "}
        <a href="https://www.heroku.com/" rel="noreferrer" target="_blank">
          Heroku
        </a>
        .
      </p>
    </>
  );
}
