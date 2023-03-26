import { useState, useContext } from "react";
import { ACTION_TYPES, parishContext } from "../pages/_app";

export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(parishContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMessage("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMessage("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
}
