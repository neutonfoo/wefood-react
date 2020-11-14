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

export function getPoll(pollId) {
  return fetch(`/api/poll/${pollId}`, {
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

export function createPoll(
  pollPrompt,
  location,
  cuisine,
  cuisineQuery,
  priceRangeIndex,
  numberOfResults,
  isUsingCurrentLocation
) {
  return fetch("/api/poll", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      poll_prompt: pollPrompt,
      location: location,
      cuisine: cuisine,
      cuisine_query: cuisineQuery,
      price_range_index: priceRangeIndex,
      number_of_results: numberOfResults,
      is_using_current_location: isUsingCurrentLocation,
    }),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
}

export function votePoll(pollId, business_id) {
  return fetch(`/api/poll/${pollId}`, {
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

export function deletePoll(pollId) {
  return fetch(`/api/poll/${pollId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pollId: pollId,
    }),
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

export function getBusinessReviews(business_id) {
  return fetch(`/api/review/${business_id}`, {
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

export const googleMapsAPIKey = "AIzaSyC-jahAg1ScTgOzzhcg-BdwArYBscSRi-E";
