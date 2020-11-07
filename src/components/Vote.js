import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { getPoll, votePoll, getBusinessReviews } from "../util/apiAdapter";

import "./Vote.css";

export default function Vote() {
  let { poll_id } = useParams();
  const [poll, setPoll] = useState();
  const [isVoted, setIsVoted] = useState(false);

  const [viewingBusinessName, setViewingBusinessName] = useState("");
  const [viewingBusinessId, setViewingBusinessId] = useState();
  const [viewingBusinessReviews, setViewingBusinessReviews] = useState();

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

  useEffect(() => {
    if (viewingBusinessId !== undefined) {
      getBusinessReviews(viewingBusinessId).then(response => {
        setViewingBusinessReviews(response);
      });
    }
  }, [viewingBusinessId]);

  function handleVote(business_id) {
    setIsVoted(true);
    votePoll(poll.poll_id, business_id);
  }

  function handleViewBusinessReviews(business_id, business_name) {
    setViewingBusinessId(business_id);
    setViewingBusinessName(business_name);
  }

  return (
    <>
      {!poll && <p>Loading</p>}
      {poll && (
        <>
          <h3 className="text-center mt-2">
            <span className="badge badge-success">{poll.poll_id}</span>
          </h3>
          <h1 className="text-center">{poll.poll_prompt}</h1>
          <h5 className="text-center">
            Cuisine <span className="badge badge-warning">{poll.cuisine}</span>
          </h5>
          {poll.is_using_current_location && (
            <>
              <h5 className="text-center">
                Latitude{" "}
                <span className="badge badge-primary">
                  {poll.location.split(",")[0]}
                </span>
              </h5>
              <h5 className="text-center">
                Longitude{" "}
                <span className="badge badge-primary">
                  {poll.location.split(",")[1]}
                </span>
              </h5>
            </>
          )}
          {!poll.is_using_current_location && (
            <h5 className="text-center">
              Location{" "}
              <span className="badge badge-primary">{poll.location}</span>
            </h5>
          )}
          <div>
            {poll.businesses
              .sort((a, b) => b.votes - a.votes)
              .map((business, businessIndex) => (
                <div
                  key={business.id}
                  className="card business-card my-2 mx-auto"
                >
                  <img
                    className="card-img-top"
                    src={business.image_url}
                    alt={business.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
                    <address>
                      {business.address.map((addressPart, addressPartIndex) => (
                        <span key={addressPartIndex}>
                          {addressPart}
                          {addressPartIndex < business.address.length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                    </address>
                    <p className="card-text">
                      {business.categories.map(category => (
                        <span
                          key={category}
                          className="badge badge-pill badge-dark mx-1"
                        >
                          {category}
                        </span>
                      ))}
                    </p>
                    <a
                      href={business.url}
                      className="btn btn-danger"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-yelp"></i> Yelp
                    </a>

                    <button
                      type="button"
                      className="btn btn-warning mx-1"
                      data-toggle="modal"
                      data-target="#reviewsModal"
                      onClick={() =>
                        handleViewBusinessReviews(business.id, business.name)
                      }
                    >
                      Reviews
                    </button>

                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleVote(business.id)}
                      disabled={isVoted}
                    >
                      Vote
                    </button>
                    <span className="mx-1">
                      {business.votes} Vote{business.votes === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ))}
            {/* Reviews Modal */}
            <div className="modal fade" id="reviewsModal" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {viewingBusinessName} Reviews
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {viewingBusinessReviews !== undefined && (
                      <>
                        Total Reviews: {viewingBusinessReviews.total}
                        {viewingBusinessReviews.reviews.map(review => (
                          <div className="card my-2">
                            <div className="card-body">
                              {review.text}
                              <hr />
                              Rating: {review.rating} / 5
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
