import React, { useState, useEffect } from "react";
import useRestaurants from "../services/firebase/useRestaurants";
import GoogleMapReact from 'google-map-react';
import { Marker } from "@react-google-maps/api";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const [restaurants, setRestaurants] = useState([]);
  const { getRestaurants } = useRestaurants();

  const getRestaurantsData = async () => {

    try {
      const restaurantsSnap = await getRestaurants();
      let restaurants = [];

      if (restaurantsSnap.size) {
        restaurantsSnap.forEach((doc) => {
          restaurants.push({ ...doc.data(), ...{ id: doc.id } });
        });

        setRestaurants(restaurants.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRestaurantsData();
  },);
  const defaultProps = {
    center: {
      lat: 50.91165989082162,
      lng: -1.4038708445833388
    },

    zoom: 11
  };

  return (

    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* {restaurants.map(r => (
          <Marker
            position={{ lat: r.lat, lon: r.lon }}
            // or use lat = {r.lat} lon = {r.lon}
            title={r.name}
          />
          //<Marker title={r.name} />
        ))} */}
      </GoogleMapReact>
    </div>
  );
}