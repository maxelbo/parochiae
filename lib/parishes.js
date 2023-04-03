import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForParishes = (query, latLong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfParishPhotos = async () => {
  try {
    // From Unsplash API
    const photos = await unsplash.search.getPhotos({
      query: "catholic parish church",
      page: 1,
      perPage: 30,
    });

    const randomPhoto = photos.response.results;
    return randomPhoto.map((photo) => photo.urls["small"]);
  } catch (error) {
    return [];
  }
};

export const fetchParishes = async (
  latLong = "35.80255155899892%2C139.72881506578645",
  limit = 6
) => {
  const photos = await getListOfParishPhotos();

  // From Foursquare API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForParishes("catholic", latLong, limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.formatted_address,
      distance: result.distance,
      ward: result.location.locality,
      imgUrl: photos.length > 0 ? photos[i] : null,
    };
  });
};
