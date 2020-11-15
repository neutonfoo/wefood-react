import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getPoll } from "../util/apiAdapter";

import YelpMap from "./YelpMap";
import Spinner from "./Spinner";
import Businesses from "./Businesses";

export default function Vote({ readOnly = false }) {
  let { pollId } = useParams();
  const [error, setError] = useState("");

  const [poll, setPoll] = useState();

  useEffect(() => {
    if (readOnly) {
      document.title = "View : WeFood";
    } else {
      document.title = "Vote : WeFood";
    }
  }, [readOnly]);

  useEffect(() => {
    return getPoll(pollId).then(poll => {
      if (poll.error) {
        setError(poll.error);
      } else {
        setPoll(poll);
        if (window.jQuery) {
          window.jQuery('[data-toggle="tooltip"]').tooltip();
        }

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
          <h2 className="text-center my-2">
            <span className="badge badge-success">{pollId}</span>
          </h2>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </>
      )}
      {!error && !poll && <Spinner>Loading... </Spinner>}
      {poll && (
        <>
          <h2 className="text-center my-2" data-test="pollIdHeading">
            <span
              className="badge badge-success align-text-bottom"
              data-toggle="tooltip"
              data-placement="right"
              title="Share this poll code with your group!"
            >
              {poll.pollId}
            </span>
          </h2>
          {poll.poll_prompt !== "" && (
            <h1 id="poll-prompt" className="text-center mt-3 mb-3 display-4">
              {poll.poll_prompt}
            </h1>
          )}
          <YelpMap
            businesses={poll.businesses}
            center={{
              lat: poll.lat,
              lng: poll.lng,
            }}
            is_using_current_location={poll.is_using_current_location}
          />
          <p className="text-center my-3">
            <span className="badge badge-warning align-text-bottom">
              {poll.cuisine}
            </span>{" "}
            in{" "}
            {poll.is_using_current_location && (
              <>
                <span className="badge badge-primary align-text-bottom">
                  {parseFloat(poll.location.split(",")[0]).toFixed(5)},{" "}
                  {parseFloat(poll.location.split(",")[1]).toFixed(5)}
                </span>
              </>
            )}
            {!poll.is_using_current_location && (
              <span className="badge badge-primary align-text-bottom">
                {poll.location}
              </span>
            )}
          </p>
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
