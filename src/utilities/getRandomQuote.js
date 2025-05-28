import { URL } from "../config/URL";

export async function getRandomQuote() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const response = await fetch(URL.GET_RANDOM_QUOTE, {
    headers: {
      'X-Api-Key': apiKey
    }
  });
  const data = await response.json();

  return data;
}
