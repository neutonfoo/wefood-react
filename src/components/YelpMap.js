import React from "react";
import GoogleMapReact from "google-map-react";
import YelpMapMarker from "./YelpMapMarker";

import { googleMapsAPIKey } from "../util/apiAdapter";

export default function YelpMap({ center, businesses, zoom = 11 }) {
  return (
    <>
      <div className="text-center">
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#mapsModal"
        >
          <i className="fas fa-map"></i> Google Maps
        </button>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="mapsModal" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <i className="fas fa-map"></i> Google Maps
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* // Important! Always set the container height explicitly */}
              <div
                className="text-center border"
                style={{ height: "70vh", width: "100%" }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: googleMapsAPIKey,
                  }}
                  defaultCenter={center}
                  defaultZoom={zoom}
                >
                  {businesses.map(business => (
                    <YelpMapMarker
                      key={business.id}
                      name={business.name}
                      lat={business.lat}
                      lng={business.lng}
                    />
                  ))}
                </GoogleMapReact>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
