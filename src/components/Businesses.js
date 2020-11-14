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
                    <i className="fas fa-dice-three text-secondary"></i>
                  )}
                  {businessIndex > 2 && (
                    <span className="badge badge-light border border-dark">
                      {businessIndex + 1}
                    </span>
                  )}{" "}
                  {business.name}
                </h3>
                <address
                  className={`ml-3 pl-3 small border-left
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
                  className={`badge p-2 mr-1 ${
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
                  Total Reviews: {viewingBusinessReviews.total}
                  {viewingBusinessReviews.reviews.map(review => (
                    <div key={review.id} className="card my-2">
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
  );
}
