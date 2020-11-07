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
          <h1 className="text-center">{poll.poll_prompt}</h1>
          <h2 className="text-center">
            <span className="badge badge-success">{poll.poll_id}</span>
          </h2>
          <h5 className="text-center">
            Cuisine <span className="badge badge-warning">{poll.cuisine}</span>
          </h5>
          <h5 className="text-center">
            Location{" "}
            <span className="badge badge-primary">{poll.location}</span>
          </h5>
          <div>
            {poll.businesses
              .sort((a, b) => b.votes - a.votes)
              .map((business, businessIndex) => (
                <div key={business.id} class="card business-card my-2 mx-auto">
                  <img
                    class="card-img-top"
                    src={business.image_url}
                    alt={business.name}
                  />
                  <div class="card-body">
                    <h5 class="card-title">{business.name}</h5>
                    <p class="card-text">{business.categories}</p>
                    <a
                      href={business.url}
                      class="btn btn-danger"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i class="fab fa-yelp"></i> Yelp
                    </a>

                    <button
                      type="button"
                      className="btn btn-info mx-1"
                      onClick={() => handleVote(business.id)}
                    >
                      Vote
                    </button>
                    <span>
                      {business.votes} Vote{business.votes === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}
