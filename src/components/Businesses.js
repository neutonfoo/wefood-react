import React, { useState, useEffect } from "react";

import { votePoll, getBusinessReviews } from "../util/apiAdapter";

export default function Businesses({ pollId, businesses, readOnly = false }) {
  const [isVoted, setIsVoted] = useState(false);

  const [viewingBusinessName, setViewingBusinessName] = useState("");
  const [viewingBusinessId, setViewingBusinessId] = useState();
  const [viewingBusinessReviews, setViewingBusinessReviews] = useState();

  useEffect(() => {
    if (viewingBusinessId !== undefined) {
      getBusinessReviews(viewingBusinessId).then(response => {
        setViewingBusinessReviews(response);
      });
    }
  }, [viewingBusinessId]);

  function handleVote(business_id) {
    setIsVoted(true);
    votePoll(pollId, business_id);
  }

  function handleViewBusinessReviews(business_id, business_name) {
    setViewingBusinessId(business_id);
    setViewingBusinessName(business_name);
  }

  return (
    <div>
      {businesses.length === 0 && (
        <p className="text-center">
          No results found. Please try again with another location.
        </p>
      )}
      {businesses.length > 0 &&
        businesses
          .sort((a, b) => b.votes - a.votes)
          .map((business, businessIndex) => (
            <div
              key={business.id}
              className={`card business-card my-2 mx-auto
              ${businessIndex === 0 ? "text-white bg-dark border" : ""}
              ${businessIndex === 1 ? "bg-light border border-dark" : ""}`}
            >
              <img
                className="card-img-top my-0"
                src={business.image_url}
                alt={business.name}
              />
              <div className="card-body pt-2">
                <h3 className="card-title">
                  {businessIndex === 0 && (
                    <i className="fa fa-star text-warning"></i>
                  )}
                  {businessIndex === 1 && (
                    <i className="fas fa-dice-two text-dark"></i>
                  )}
                  {businessIndex === 2 && (
                    <i className="fas fa-dice-three text-dark"></i>
                  )}
                  {businessIndex > 2 && (
                    <span className="badge badge-light border border-dark">
                      {businessIndex + 1}
                    </span>
                  )}{" "}
                  {business.name}
                </h3>
                <address
                  className={`ml-3 mb-2 pl-3 small border-left
                  ${businessIndex === 0 ? "border-warning" : "border-dark"}
                  `}
                >
                  {business.address.map((addressPart, addressPartIndex) => (
                    <span key={addressPartIndex}>
                      {addressPart}
                      {addressPartIndex < business.address.length - 1 && <br />}
                    </span>
                  ))}
                </address>
                <p className="card-text">
                  {business.categories.map(category => (
                    <span
                      key={category}
                      className={`badge badge-pill mr-1 my-0 ${
                        businessIndex === 0 ? "badge-light" : "badge-dark"
                      }`}
                    >
                      {category}
                    </span>
                  ))}
                </p>
                <a
                  href={business.url}
                  className="btn btn-danger mr-1"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-yelp"></i> Yelp
                </a>
                <button
                  type="button"
                  className="btn btn-warning mr-1"
                  data-toggle="modal"
                  data-target="#reviewsModal"
                  onClick={() =>
                    handleViewBusinessReviews(business.id, business.name)
                  }
                  data-test="reviewButton"
                >
                  Reviews
                </button>
                {!readOnly && (
                  <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={() => handleVote(business.id)}
                    disabled={isVoted}
                    data-test="voteButton"
                  >
                    Vote{isVoted ? "d" : ""}
                  </button>
                )}
                <span
                  className={`badge p-2 ${
                    readOnly ? "badge-primary" : "badge-secondary"
                  }`}
                >
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
              <h5 className="modal-title">{viewingBusinessName} Reviews</h5>
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
                  <h5>
                    Total Reviews{" "}
                    <span class="badge badge-danger align-text-bottom">
                      {viewingBusinessReviews.total}
                    </span>
                  </h5>
                  {viewingBusinessReviews.reviews
                    .sort((a, b) => b.rating - a.rating)
                    .map(review => (
                      <div
                        key={review.id}
                        className={`card my-2 ${
                          review.rating === 5
                            ? "bg-light border border-dark"
                            : ""
                        }`}
                      >
                        <div className="card-body p-2">
                          <p className="mb-1">
                            <span
                              class={`badge badge-pill badge-light border ${
                                review.rating === 5 ? "border-dark" : ""
                              }`}
                            >
                              {review.time_created}
                            </span>
                          </p>
                          <p className="mb-1 p-2">{review.text}</p>
                          <p className="mb-0">
                            {Array.from(Array(review.rating), (e, i) => (
                              <i
                                class={`fas fa-star ${
                                  review.rating === 5 ? "text-warning" : ""
                                }`}
                              ></i>
                            ))}
                            {Array.from(Array(5 - review.rating), (e, i) => (
                              <i class="far fa-star"></i>
                            ))}
                          </p>
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
  );
}
