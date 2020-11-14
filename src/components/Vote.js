import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getPoll } from "../util/apiAdapter";

import YelpMap from "./YelpMap";
import Businesses from "./Businesses";

import "./Vote.css";

export default function Vote({ readOnly = false }) {
  let { pollId } = useParams();
  const [error, setError] = useState("");

  const [poll, setPoll] = useState();

  useEffect(() => {
    return getPoll(pollId).then(poll => {
      if (poll.error) {
        setError(poll.error);
      } else {
        setPoll(poll);

        const longPolling = setInterval(() => {
          getPoll(pollId).then(response => {
            setPoll(response);
          });
        }, 500);

        return () => {
          clearInterval(longPolling);
        };
      }
    });
  }, [pollId]);

  return (
    <>
      {error && (
        <>
          <h3 className="text-center mt-2">
            <span className="badge badge-success">{pollId}</span>
          </h3>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </>
      )}
      {!error && !poll && <p>Loading...</p>}
      {poll && (
        <>
          <h3 className="text-center mt-2" data-test="pollIdHeading">
            Poll <span className="badge badge-success">{poll.pollId}</span>
          </h3>
          <h1 className="text-center">{poll.poll_prompt}</h1>
          <h4 className="text-center">
            Cuisine <span className="badge badge-warning">{poll.cuisine}</span>
          </h4>
          {poll.is_using_current_location && (
            <>
              <h6 className="text-center">
                Latitude{" "}
                <span className="badge badge-primary">
                  {parseFloat(poll.location.split(",")[0]).toFixed(5)}
                </span>
              </h6>
              <h6 className="text-center">
                Longitude{" "}
                <span className="badge badge-primary">
                  {parseFloat(poll.location.split(",")[1]).toFixed(5)}
                </span>
              </h6>
              <YelpMap
                businesses={poll.businesses}
                center={{
                  lat: parseFloat(poll.location.split(",")[0]),
                  lng: parseFloat(poll.location.split(",")[1]),
                }}
              />
            </>
          )}
          {!poll.is_using_current_location && (
            <h6 className="text-center">
              Location{" "}
              <span className="badge badge-primary">{poll.location}</span>
            </h6>
          )}
          <Businesses
            pollId={poll.pollId}
            businesses={poll.businesses}
            readOnly={readOnly}
          />
        </>
      )}
    </>
  );
}
