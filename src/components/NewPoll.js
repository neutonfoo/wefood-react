import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { createPoll, getCuisines } from "../util/apiAdapter";

export default function NewPoll() {
  const history = useHistory();

  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const [isLoadingCuisines, setIsLoadingCuisines] = useState(true);
  const [cuisines, setCuisines] = useState([]);

  const [location, setLocation] = useState("");
  const [numberOfResults, setNumberOfResults] = useState(5);
  const [selectedCuisineQuery, setSelectedCuisineQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("$");

  useEffect(() => {
    // Get list of cuisines
    getCuisines().then(response => {
      setCuisines(response);
      setIsLoadingCuisines(false);
    });

    // Get location
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    //   });
    // } else {
    //   console.log("Not Available");
    // }
  }, []);

  useEffect(() => {
    if (cuisines.length > 0) {
      setSelectedCuisineQuery(cuisines[0].cuisineQuery);
    }
  }, [cuisines]);

  function handleLocationInput(e) {
    setLocation(e.target.value);
  }
  function handleNumberOfResultsChange(e) {
    setNumberOfResults(e.target.value);
  }

  function handleSelectedCuisineQuery(cuisineQuery) {
    setSelectedCuisineQuery(cuisineQuery);
  }

  function handlePriceRangeClick(priceRange) {
    setSelectedPriceRange(priceRange);
  }

  function handleCreatePoll(e) {
    e.preventDefault();

    // createPoll(selectedCuisineQuery, location).then(res => {
    createPoll(selectedCuisineQuery, location, numberOfResults).then(res => {
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
          <h5>Location</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={location}
            onChange={e => handleLocationInput(e)}
          />
        </div>
        <div className="form-group text-center">
          <h5>Cuisine</h5>
          <div className="btn-group-vertical d-flex" role="group">
            {isLoadingCuisines && <div>Loading...</div>}
            {!isLoadingCuisines &&
              cuisines.map(({ cuisine, cuisineQuery }, cuisineIndex) => (
                <button
                  key={cuisineIndex}
                  type="button"
                  className={`btn btn-info ${
                    selectedCuisineQuery === cuisineQuery ? "active" : ""
                  }`}
                  value={cuisineQuery}
                  onClick={() => handleSelectedCuisineQuery(cuisineQuery)}
                >
                  {cuisine}
                </button>
              ))}
          </div>
        </div>
        <div className="form-group text-center">
          <h5>Price Range</h5>
          <div className="btn-group d-flex" role="group">
            {priceRanges.map(priceRange => (
              <button
                key={priceRange}
                type="button"
                className={`btn btn-dark ${
                  selectedPriceRange === priceRange ? "active" : ""
                }`}
                onClick={() => handlePriceRangeClick(priceRange)}
              >
                {priceRange}
              </button>
            ))}
          </div>
          <div className="form-group text-center my-2">
            <h5>Number of Results</h5>
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
