import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getPoll } from "../util/apiAdapter";

export default function Join() {
  const history = useHistory();

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

    getPoll(pollId).then(poll => {
      if (poll.error) {
        console.log("Poll does not exist.");
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
        <button type="submit" className="btn btn-primary">
          Join
        </button>
      </form>
    </>
  );
}
