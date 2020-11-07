import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getPoll } from "../util/apiAdapter";

export default function Join() {
  const history = useHistory();

  const [error, setError] = useState();
  const [pollId, setPollId] = useState("");

  function handlePollIdChange(event) {
    const newPollId = event.target.value;

    if (isNaN(newPollId)) {
      // Not a number
    } else {
      setPollId(Number(event.target.value));
    }
  }

  function handleJoinPoll(e) {
    e.preventDefault();

    if (pollId === "") {
      setError("No Poll ID entered.");
      return;
    }

    getPoll(pollId).then(poll => {
      if (poll.error) {
        setError(poll.error);
      } else {
        history.push(`/vote/${poll.poll_id}`);
      }
    });

    // if (poll.error) {
    //   console.log("ASDASD");
    // }
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger my-2" role="alert">
          Error: {error}
        </div>
      )}
      <h1 className="text-center">Join Poll</h1>
      <p className="text-center">Enter a Poll ID below to join a poll.</p>
      <form
        onSubmit={e => handleJoinPoll(e)}
        className="form-inline justify-content-center"
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Poll ID"
            value={pollId}
            onChange={e => handlePollIdChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Join
        </button>
      </form>
    </>
  );
}
