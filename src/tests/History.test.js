import { render, waitForElementToBeRemoved } from "@testing-library/react";
import History from "../components/History";

import { BrowserRouter } from "react-router-dom";

import { createServer } from "miragejs";

const polls = [
  [
    "9996",
    {
      pollId: 9996,
      date: "11/13/2020",
      time: "7:40:11 PM",
      poll_prompt: "Test Poll",
      location: "34.026291199999996,-118.28920319999999",
      cuisine: "Desserts",
      cuisine_query: "dessert",
      price_range_index: 1,
      number_of_results: "10",
      is_using_current_location: true,
      businesses: [
        {
          id: "XpPLvHEu-qmWdRa-2ZpxzQ",
          name: "MuMu Bakery & Cafe",
          address: ["3109 W Olympic Blvd", "Ste D", "Los Angeles, CA 90006"],
          url:
            "https://www.yelp.com/biz/mumu-bakery-and-cafe-los-angeles?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media2.fl.yelpcdn.com/bphoto/Q_GQU-H-MPfkRRL5gizNlw/o.jpg",
          categories: ["Bakeries", "Desserts", "Patisserie/Cake Shop"],
          lat: 34.05293,
          lng: -118.30352,
          votes: 0,
        },
        {
          id: "P-BxXRT5V6D7YtggfsMgYw",
          name: "The Dolly Llama",
          address: ["611 S Spring St", "Los Angeles, CA 90014"],
          url:
            "https://www.yelp.com/biz/the-dolly-llama-los-angeles?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media2.fl.yelpcdn.com/bphoto/i14srdvAmQG4-kU1RXWEKg/o.jpg",
          categories: ["Desserts", "Waffles", "Ice Cream & Frozen Yogurt"],
          lat: 34.045819,
          lng: -118.251491,
          votes: 0,
        },
        {
          id: "bl8mTB2QSZf7WsmXrddOTA",
          name: "Bae",
          address: ["369 E 2nd St", "Los Angeles, CA 90012"],
          url:
            "https://www.yelp.com/biz/bae-los-angeles-6?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media4.fl.yelpcdn.com/bphoto/A37rgnESCMLzy8va-4e_ew/o.jpg",
          categories: ["Ice Cream & Frozen Yogurt", "Desserts", "Acai Bowls"],
          lat: 34.04844,
          lng: -118.23987,
          votes: 1,
        },
        {
          id: "HZ0ZaBYmO5f-ywQBbsEtlw",
          name: "The Baked Bear",
          address: [
            "929 W Jefferson Blvd",
            "Ste 1620",
            "Los Angeles, CA 90007",
          ],
          url:
            "https://www.yelp.com/biz/the-baked-bear-los-angeles-2?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/47bzy3LFbJWalTy942JMJg/o.jpg",
          categories: ["Desserts", "Ice Cream & Frozen Yogurt", "Donuts"],
          lat: 34.025016,
          lng: -118.285348,
          votes: 0,
        },
        {
          id: "2diQcj7sFRBbcXwJ5zmnvQ",
          name: "Anko",
          address: ["400 S Western Ave", "Los Angeles, CA 90020"],
          url:
            "https://www.yelp.com/biz/anko-los-angeles?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/ojK7K3uKp0Rf7sSZqpibhg/o.jpg",
          categories: ["Desserts", "Coffee & Tea", "Shaved Ice"],
          lat: 34.0669778875893,
          lng: -118.30876664418,
          votes: 0,
        },
        {
          id: "Jrzd-QEY6X-t6CBAKkAXug",
          name: "SomiSomi",
          address: ["621 Western Ave", "Ste 208-A", "Los Angeles, CA 90005"],
          url:
            "https://www.yelp.com/biz/somisomi-los-angeles-3?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/QTj1LR3OEOojJe68-c7-cg/o.jpg",
          categories: ["Desserts", "Ice Cream & Frozen Yogurt", "Korean"],
          lat: 34.062779,
          lng: -118.309529,
          votes: 0,
        },
        {
          id: "M73tbVuf1__DKCRer_V0Rw",
          name: "La Michoacana Cold Delights",
          address: ["2807 S Vermont Ave", "Los Angeles, CA 90007"],
          url:
            "https://www.yelp.com/biz/la-michoacana-cold-delights-los-angeles-2?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media1.fl.yelpcdn.com/bphoto/rNQMIvbt4OzBqrRBAvWy2g/o.jpg",
          categories: ["Ice Cream & Frozen Yogurt"],
          lat: 34.02928,
          lng: -118.29191,
          votes: 0,
        },
        {
          id: "YA3bV7kd3RpWPvrarIgpWQ",
          name: "Milk Jar Cookies",
          address: ["5466 Wilshire Blvd", "Los Angeles, CA 90036"],
          url:
            "https://www.yelp.com/biz/milk-jar-cookies-los-angeles?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/I6DagGKf6AssBQoy_-rMxQ/o.jpg",
          categories: ["Desserts", "Bakeries", "Coffee & Tea"],
          lat: 34.0621217190808,
          lng: -118.347790289087,
          votes: 0,
        },
        {
          id: "N7AviqBUEnxJGNhYrG3MKA",
          name: "Coolhaus",
          address: ["8588 Washington Blvd", "Culver City, CA 90232"],
          url:
            "https://www.yelp.com/biz/coolhaus-culver-city?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media1.fl.yelpcdn.com/bphoto/AaNY0oz5HB_TlD5qT_XBwQ/o.jpg",
          categories: ["Ice Cream & Frozen Yogurt", "Desserts"],
          lat: 34.0302095984202,
          lng: -118.381282072168,
          votes: 0,
        },
        {
          id: "LCgDnpydbmFOsgW1EN7a-Q",
          name: "Bumsan Organic Milk Bar",
          address: ["534 S Western Ave", "Los Angeles, CA 90020"],
          url:
            "https://www.yelp.com/biz/bumsan-organic-milk-bar-los-angeles?adjust_creative=oJnCbzpyw5Rxk52XkrDDpQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=oJnCbzpyw5Rxk52XkrDDpQ",
          image_url:
            "https://s3-media3.fl.yelpcdn.com/bphoto/_2SNhSeugmrLOHhGiM-iUw/o.jpg",
          categories: ["Ice Cream & Frozen Yogurt"],
          lat: 34.0643682,
          lng: -118.3089751,
          votes: 0,
        },
      ],
      businessesMap: {
        "XpPLvHEu-qmWdRa-2ZpxzQ": 0,
        "P-BxXRT5V6D7YtggfsMgYw": 1,
        bl8mTB2QSZf7WsmXrddOTA: 2,
        "HZ0ZaBYmO5f-ywQBbsEtlw": 3,
        "2diQcj7sFRBbcXwJ5zmnvQ": 4,
        "Jrzd-QEY6X-t6CBAKkAXug": 5,
        M73tbVuf1__DKCRer_V0Rw: 6,
        YA3bV7kd3RpWPvrarIgpWQ: 7,
        N7AviqBUEnxJGNhYrG3MKA: 8,
        "LCgDnpydbmFOsgW1EN7a-Q": 9,
      },
    },
  ],
];

let server;
beforeEach(() => {
  server = createServer({
    routes() {
      // this.urlPrefix = "https://www.reddit.com";
      this.namespace = "api";
      this.logging = false;

      this.get("/poll", () => {
        return polls;
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test("History displays the correct number of polls", async () => {
  // Create Component
  const { container, queryByText } = render(
    <BrowserRouter>
      <History />
    </BrowserRouter>
  );
  // Wait for load
  await waitForElementToBeRemoved(() => queryByText("No polls yet."));

  const historyTableBody = container.querySelector(
    "[data-test='historyTable'] > tbody"
  );
  expect(historyTableBody.children.length).toEqual(polls.length);
});

test("History displays the correct poll detials", async () => {
  // Create Component
  const { container, queryByText } = render(
    <BrowserRouter>
      <History />
    </BrowserRouter>
  );
  // Wait for load
  await waitForElementToBeRemoved(() => queryByText("No polls yet."));

  const historyTableBody = container.querySelector(
    "[data-test='historyTable'] > tbody"
  );

  const [pollId, poll] = polls[0];

  const pollRow = historyTableBody.children[0];
  expect(pollRow.children[0].children[0]).toHaveTextContent(pollId);
  expect(pollRow.children[1]).toHaveTextContent(`${poll.date}${poll.time}`);
  expect(pollRow.children[2]).toHaveTextContent(poll.cuisine);

  const lat = parseFloat(poll.location.split(",")[0]).toFixed(5);
  const lng = parseFloat(poll.location.split(",")[1]).toFixed(5);

  expect(pollRow.children[3]).toHaveTextContent(`${lat},${lng}`);

  const businessName = poll.businesses.sort((a, b) => b.votes - a.votes)[0]
    .name;
  expect(pollRow.children[4]).toHaveTextContent(businessName);
});
