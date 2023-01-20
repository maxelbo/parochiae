import { useState } from "react";

export default function useTrackLocation() {
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
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
    latLong,
    handleTrackLocation,
    locationErrorMessage,
    isFindingLocation,
  };
}
