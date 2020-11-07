import React, { useState, useEffect } from "react";

import { getPolls } from "../util/apiAdapter";

export default function History() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    getPolls().then(response => {
      setPolls(response);
    });
  }, []);

  return (
    <>
      <h1 className="text-center">History</h1>
      <p className="text-center">Past polls and their winners.</p>
      {polls.length === 0 && <p>No polls yet.</p>}
      {polls.length > 0 && (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="text-center" scope="col">
                Date
              </th>
              <th className="text-center" scope="col">
                Total Votes
              </th>
              <th className="text-center" scope="col">
                Cuisine
              </th>
              <th className="text-center" scope="col">
                Location
              </th>
              <th className="text-center" scope="col">
                Winner <small>(# Votes)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {polls
              .filter(([poll_id, poll]) => poll.businesses.length > 0)
              .map(([poll_id, poll]) => (
                <tr key={poll_id}>
                  <td>{poll.date}</td>
                  <td>{poll.businesses.reduce((a, b) => a + b.votes, 0)}</td>
                  <td>{poll.cuisine}</td>
                  <td>{poll.location}</td>
                  <td>
                    {poll.businesses.sort((a, b) => b.votes - a.votes)[0].name}{" "}
                    (
                    {poll.businesses.sort((a, b) => b.votes - a.votes)[0].votes}{" "}
                    Votes)
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
