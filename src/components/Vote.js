import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getPoll, votePoll } from "../util/apiAdapter";

import "./Vote.css";

export default function Vote() {
  let { poll_id } = useParams();
  const [poll, setPoll] = useState();

  useEffect(() => {
    const longPolling = setInterval(() => {
      getPoll(poll_id).then(response => {
        setPoll(response);
      });
    }, 500);

    return () => {
      clearInterval(longPolling);
    };
  }, [poll_id]);

  function handleVote(business_id) {
    console.log("VOTING! ");
    votePoll(poll.poll_id, business_id);
  }

  return (
    <>
      {!poll && <p>Loading</p>}
      {poll && (
        <>
          <h1 className="text-center">
            Voting in Poll{" "}
            <span className="badge badge-success">{poll.poll_id}</span>
          </h1>
          <h5 className="text-center">
            Cuisine <span className="badge badge-warning">{poll.term}</span>
          </h5>
          <h5 className="text-center">
            Location{" "}
            <span className="badge badge-primary">{poll.location}</span>
          </h5>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-center" scope="col">
                  Position
                </th>
                <th className="text-center" scope="col">
                  Location
                </th>
                <th className="text-center" scope="col">
                  Votes
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {poll.businesses
                .sort((a, b) => b.votes - a.votes)
                .map((business, businessIndex) => (
                  <tr key={business.id}>
                    <td className="text-center">
                      <span class="badge badge-info">
                        <h3>{businessIndex + 1}</h3>
                      </span>
                    </td>
                    <td className="text-center">
                      <h3>{business.name}</h3>
                      <img
                        src={business.image_url}
                        className="img-fluid img-short"
                        alt={business.name}
                      />
                    </td>
                    <td className="text-center">{business.votes}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleVote(business.id)}
                      >
                        Vote
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
