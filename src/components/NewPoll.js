import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { createPoll, getCuisines } from "../util/apiAdapter";

export default function NewPoll() {
  const history = useHistory();

  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const [isLoadingCuisines, setIsLoadingCuisines] = useState(true);
  const [cuisines, setCuisines] = useState([]);

  const [pollPrompt, setPollPrompt] = useState("");
  const [location, setLocation] = useState("");
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [numberOfResults, setNumberOfResults] = useState(5);

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedCuisineQuery, setSelectedCuisineQuery] = useState("");

  const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] = useState(0);

  useEffect(() => {
    // Get list of cuisines
    getCuisines().then(response => {
      setCuisines(response);
      setIsLoadingCuisines(false);
    });
  }, []);

  useEffect(() => {
    if (isUsingCurrentLocation) {
      // Get location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        });
      } else {
        console.log("Not Available");
      }
    }
  }, [isUsingCurrentLocation]);

  useEffect(() => {
    if (cuisines.length > 0) {
      setSelectedCuisine(cuisines[0].cuisine);
      setSelectedCuisineQuery(cuisines[0].cuisineQuery);
    }
  }, [cuisines]);

  function handlePollPromptInput(e) {
    setPollPrompt(e.target.value);
  }

  function handleCurrentLocationSwitch(e) {
    setIsUsingCurrentLocation(e.target.checked);
  }

  function handleLocationInput(e) {
    setLocation(e.target.value);
  }

  function handleNumberOfResultsChange(e) {
    setNumberOfResults(e.target.value);
  }

  function handleCuisineQuery(cuisine, cuisineQuery) {
    setSelectedCuisine(cuisine);
    setSelectedCuisineQuery(cuisineQuery);
  }

  function handlePriceRangeClick(priceRange) {
    setSelectedPriceRangeIndex(priceRange);
  }

  function handleCreatePoll(e) {
    e.preventDefault();

    // createPoll(cuisineQuery, location).then(res => {
    createPoll(
      pollPrompt,
      location,
      selectedCuisine,
      selectedCuisineQuery,
      selectedPriceRangeIndex,
      numberOfResults,
      isUsingCurrentLocation
    ).then(res => {
      const poll_id = res.poll_id;
      history.push(`/vote/${poll_id}`);
    });
  }

  return (
    <>
      <h1 className="text-center">New Poll</h1>
      <p className="text-center">
        Select the options below to create a new Poll.
      </p>
      <form onSubmit={e => handleCreatePoll(e)}>
        <div className="form-group text-center">
          <h5>Poll Prompt</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Poll Prompt"
            value={pollPrompt}
            onChange={e => handlePollPromptInput(e)}
          />
        </div>
        <div className="form-group text-center">
          <h5>Location</h5>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="useCurrentLocationSwitch"
              onChange={e => handleCurrentLocationSwitch(e)}
            />
            <label
              className="custom-control-label mb-1"
              htmlFor="useCurrentLocationSwitch"
            >
              Use current location
            </label>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={e => handleLocationInput(e)}
            disabled={isUsingCurrentLocation}
          />
        </div>
        <div className="form-group text-center">
          <h5>Cuisine</h5>
          <div className="btn-group-vertical d-flex" role="group">
            {isLoadingCuisines && <div>Loading...</div>}
            {!isLoadingCuisines &&
              cuisines.map(({ cuisine, cuisineQuery }) => (
                <button
                  key={cuisineQuery}
                  type="button"
                  className={`btn btn-info ${
                    selectedCuisineQuery === cuisineQuery ? "active" : ""
                  }`}
                  value={cuisineQuery}
                  onClick={() => handleCuisineQuery(cuisine, cuisineQuery)}
                >
                  {cuisine}
                </button>
              ))}
          </div>
        </div>
        <div className="form-group text-center">
          <h5>Price Range</h5>
          <div className="btn-group d-flex" role="group">
            {priceRanges.map((priceRange, priceRangeIndex) => (
              <button
                key={priceRange}
                type="button"
                className={`btn btn-secondary ${
                  selectedPriceRangeIndex === priceRangeIndex ? "active" : ""
                }`}
                onClick={() => handlePriceRangeClick(priceRangeIndex)}
              >
                {priceRange}
              </button>
            ))}
          </div>
          <div className="form-group text-center my-2">
            <h5>
              Number of Results{" "}
              <span className="badge badge-warning">{numberOfResults}</span>
            </h5>
            <input
              type="range"
              className="custom-range"
              min="1"
              max="10"
              value={numberOfResults}
              onChange={e => handleNumberOfResultsChange(e)}
            />
          </div>
          <div className="form-group text-center my-2">
            <button type="submit" className="btn btn-danger">
              Create Poll
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
