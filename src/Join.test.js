import { render, fireEvent } from "@testing-library/react";
import Join from "./components/Join";

test("Clicking Join without inputting a poll id results in an error", async () => {
  // Create Component
  const { container } = render(<Join />);

  const joinButton = container.querySelector("[data-test='joinButton']");
  const errorAlertQuery = "[data-test='errorAlert']";

  let errorAlert = container.querySelectorAll(errorAlertQuery);
  expect(errorAlert.length).toEqual(0);

  fireEvent.click(joinButton);

  errorAlert = container.querySelectorAll(errorAlertQuery);
  expect(errorAlert.length).toEqual(1);
});
