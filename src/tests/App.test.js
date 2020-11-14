import { render } from "@testing-library/react";
import App from "../App";

test("New Poll page is default page", async () => {
  // Create Component
  const { container } = render(<App />);
  // Wait for load
  // await waitForElementToBeRemoved(() => queryByText("Loading..."));

  const pageTitle = container.querySelector("h1");
  expect(pageTitle.innerHTML).toBe("New Poll");
});
