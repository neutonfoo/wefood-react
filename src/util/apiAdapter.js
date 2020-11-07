export function createPoll(term, location, numberOfResults) {
  return fetch("/api/poll", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      term: term,
      location: location,
      numberOfResults: numberOfResults,
    }),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export function getPoll(poll_id) {
  return fetch(`/api/poll/${poll_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export function votePoll(poll_id, business_id) {
  return fetch(`/api/poll/${poll_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      business_id: business_id,
    }),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export function getPolls() {
  return fetch(`/api/poll`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export function getCuisines() {
  return fetch("/api/cuisine", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}
