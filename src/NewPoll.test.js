import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import NewPoll from "./components/NewPoll";

import { createServer } from "miragejs";

const cuisines = [
  { cuisine: "Boba", cuisineQuery: "boba" },
  { cuisine: "Burgers", cuisineQuery: "burgers" },
  { cuisine: "Desserts", cuisineQuery: "dessert" },
  { cuisine: "Fast Food", cuisineQuery: "fast food" },
  { cuisine: "Indian", cuisineQuery: "indian food" },
  { cuisine: "French", cuisineQuery: "french food" },
  { cuisine: "Italian", cuisineQuery: "italian food" },
  { cuisine: "Pasta", cuisineQuery: "pasta" },
  { cuisine: "Chinese", cuisineQuery: "chinese food" },
  { cuisine: "Japanese", cuisineQuery: "japanese food" },
  { cuisine: "Korean", cuisineQuery: "korean food" },
];

const priceRanges = ["$", "$$", "$$$", "$$$$"];

let server;
beforeEach(() => {
  server = createServer({
    routes() {
      // this.urlPrefix = "https://www.reddit.com";
      this.namespace = "api";
      this.logging = false;

      this.get("/cuisine", () => {
        return cuisines;
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test("Cuisines are loaded", async () => {
  // Create Component
  const { container, queryByText } = render(<NewPoll />);
  // Wait for load
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const cuisinesContainer = container.querySelector(
    "[data-test='cuisinesContainer']"
  );
  const numberOfCuisinesLoaded = cuisinesContainer.children.length;
  expect(numberOfCuisinesLoaded).toEqual(cuisines.length);
});

test("Toggling Current Location disables location textbox", async () => {
  const { container, queryByText } = render(<NewPoll />);
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const useCurrentLocationToggle = container.querySelector(
    "[data-test='useCurrentLocationToggle']"
  );
  const locationInput = container.querySelector("[data-test='locationInput']");

  expect(locationInput["disabled"]).toBe(false);
  fireEvent.click(useCurrentLocationToggle);
  expect(locationInput["disabled"]).toBe(true);
});

test("Clicking new cuisine changes active cuisine", async () => {
  const { container, queryByText } = render(<NewPoll />);
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const cuisinesContainer = container.querySelector(
    "[data-test='cuisinesContainer']"
  );

  const activeCuisineQuery = "[data-test='cuisinesContainer'] > button.active";

  let activeCuisine = document.querySelector(activeCuisineQuery);
  expect(activeCuisine.value).toBe(cuisines[0].cuisineQuery);

  fireEvent.click(cuisinesContainer.children[4]);

  activeCuisine = document.querySelector(activeCuisineQuery);
  expect(activeCuisine.value).toBe(cuisines[4].cuisineQuery);
});

test("Clicking new price range changes active price range", async () => {
  const { container, queryByText } = render(<NewPoll />);
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const priceRangeContainer = container.querySelector(
    "[data-test='priceRangeContainer']"
  );

  const activePriceRangeQuery =
    "[data-test='priceRangeContainer'] > button.active";

  let activePriceRange = document.querySelector(activePriceRangeQuery);
  expect(activePriceRange.value).toBe(priceRanges[0]);

  fireEvent.click(priceRangeContainer.children[2]);

  activePriceRange = document.querySelector(activePriceRangeQuery);
  expect(activePriceRange.value).toBe(priceRanges[2]);
});

test("Default number of results is 5", async () => {
  // Create Component
  const { container, queryByText } = render(<NewPoll />);
  // Wait for load
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const numberOfResultsInput = container.querySelector(
    "[data-test='numberOfResultsInput']"
  );
  const defaultNumberOfResultsInput = Number(numberOfResultsInput.value);
  expect(defaultNumberOfResultsInput).toEqual(5);
});

test("Entering a location is required / will cause an error alert to appear", async () => {
  const { container, queryByText } = render(<NewPoll />);
  await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const createPollButton = container.querySelector(
    "[data-test='createPollButton']"
  );
  const errorAlertQuery = "[data-test='errorAlert']";
  let errorAlert = container.querySelectorAll(errorAlertQuery);
  expect(errorAlert.length).toBe(0);

  fireEvent.click(createPollButton);

  errorAlert = container.querySelectorAll(errorAlertQuery);
  expect(errorAlert.length).toBe(1);
});
