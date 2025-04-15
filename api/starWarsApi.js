import axios from "axios";

export const getPersonagens = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("response", response.data);
    if (response.status / 100 == 2) {
      return response.data;
    } else {
      console.log("status", response.status);
      console.log("statusText", response.statusText);
    }
  } catch (err) {
    console.log("err", err);
  }
  return {
    results: [],
    previous: null,
    next: null,
  };
};
