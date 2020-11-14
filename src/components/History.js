import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getPolls, deletePoll } from "../util/apiAdapter";

export default function History() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    document.title = "History : WeFood";

    getPolls().then(response => {
      setPolls(
        response.filter(([poll_id, poll]) => poll.businesses.length > 0)
      );
    });
  }, []);

  function handleDelete(pollId) {
    // Delete
    deletePoll(pollId).then(() => {
      // Then get new list
      getPolls().then(response => {
        setPolls(
          response.filter(([poll_id, poll]) => poll.businesses.length > 0)
        );
      });
    });
  }

  return (
    <>
      <h1 className="text-center">History</h1>
      <p className="text-center">
        Past polls and their winners. Click Poll ID to view poll results.
      </p>
      {polls.length === 0 && <p className="text-center">No polls yet.</p>}
      {polls.length > 0 && (
        <table className="table table-bordered" data-test="historyTable">
          <thead className="thead-light">
            <tr>
              <th className="align-middle text-center" scope="col">
                Poll
              </th>
              <th className="align-middle text-center" scope="col">
                Date
              </th>
              <th className="align-middle text-center" scope="col">
                Cuisine
              </th>
              <th className="align-middle text-center" scope="col">
                Location
              </th>
              <th className="align-middle text-center" scope="col">
                Winner
                <br />
                <small>(# Votes)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {polls.map(([poll_id, poll]) => (
              <tr key={poll_id}>
                <td className="align-middle text-center">
                  <h5>
                    <Link
                      to={`/view/${poll.pollId}`}
                      className="badge badge-success p-2 mb-1"
                    >
                      {poll.pollId}
                    </Link>
                  </h5>
                  <button
                    type="button"
                    className="btn btn-danger p-1"
                    onClick={() => handleDelete(poll.pollId)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td className="align-middle text-center">
                  <span className="badge badge-light border">{poll.date}</span>
                  <br />
                  <span className="badge badge-light border">{poll.time}</span>
                </td>
                <td className="align-middle text-center">
                  <span className="badge badge-pill badge-warning mx-1 my-0">
                    {poll.cuisine}
                  </span>
                </td>
                <td className="align-middle text-center">
                  {poll.is_using_current_location && (
                    <>
                      <span className="badge badge-primary border">
                        {parseFloat(poll.location.split(",")[0]).toFixed(5)}
                      </span>
                      ,
                      <br />
                      <span className="badge badge-primary border">
                        {parseFloat(poll.location.split(",")[1]).toFixed(5)}
                      </span>
                    </>
                  )}
                  {!poll.is_using_current_location && (
                    <span className="badge badge-primary">{poll.location}</span>
                  )}
                </td>
                <td className="align-middle text-center">
                  <small>
                    {poll.businesses.sort((a, b) => b.votes - a.votes)[0].name}
                  </small>
                  <br />
                  <span className="badge badge-pill badge-secondary">
                    {poll.businesses.sort((a, b) => b.votes - a.votes)[0].votes}{" "}
                    Vote
                    {poll.businesses.sort((a, b) => b.votes - a.votes)[0]
                      .votes === 1
                      ? ""
                      : "s"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
