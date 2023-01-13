const getUrlForParishes = (query, latLong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchParishes = async () => {
  // From Foursquare API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  // fetch(
  //   "https://api.foursquare.com/v3/places/search?query=catholic&ll=35.80255155899892%2C139.72881506578645&limit=6",
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  const response = await fetch(
    getUrlForParishes("catholic", "35.80255155899892%2C139.72881506578645", 6),
    options
  );
  const data = await response.json();
  return data.results;
  // =================
};
