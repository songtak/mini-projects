import axios from "axios";
import CryptoJS from "crypto-js";

// const OPENAI_ENDPOINT = "https://api.openai.com/v1/engines/davinci/completions";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/completions";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/images/generations";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// const OPENAI_ENDPOINT =
//   "https://api.openai.com/v1/models/gpt-3.5-turbo-instruct";

const GARDEN_ENDPOINT = "http://api.nongsaro.go.kr/service/garden";

export const getResponseFromGPT = async (prompt) => {
  var openApiToken;

  const api_key =
    "U2FsdGVkX1+u5qamiTj7cGJ8o0NUBEMPli282MC47+s+Q+k/bF+gGjstgopCs+RH+Jl2dSoUIQvhm79C2aent4IZBaQzOEDBVLVyia5mD8c=";

  if (typeof process.env.REACT_APP_DEC_KEY === "string") {
    openApiToken = CryptoJS.AES.decrypt(
      api_key,
      process.env.REACT_APP_DEC_KEY
    ).toString(CryptoJS.enc.Utf8);
  }

  const response = await axios.post(
    OPENAI_ENDPOINT,
    {
      // messages: [
      //   {
      //     // role: "user",
      //     content: prompt,
      //   },
      // ],
      prompt: prompt,
      // max_tokens: 150000,
      model: "dall-e-3",
      // model: "gpt-4",
      // model: "gpt-3.5-turbo-16k",
      // model: "gpt-3.5-turbo-instruct",
      // model: "gpt-3.5-turbo",
    },
    {
      headers: {
        Authorization: `Bearer ${openApiToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data[0].url;
};

export const getApi = async () => {
  const api_key = "202403087MHPOVCUQJZBZ7SFUTBKG";

  const response = await axios.get("/api" + `/gardenList?apiKey=${api_key}`);

  return response;
};

export const getTurtles = async () => {
  const serviceKey =
    "cFaqNVCtLPS%2Fu3KesQfPTGPRQq6V8KXn9kQxWQKOFRoRiWPQTg1XJAlauZSzoiSZm94WWG2t9wGH53GiATyGKA%3D%3D";

  const response = await axios.get(
    "/getSeaTurtleMeta" + `?serviceKey=${serviceKey}`
  );

  return response;
};
export const getBeachWeathers = async () => {
  const serviceKey =
    "cFaqNVCtLPS%2Fu3KesQfPTGPRQq6V8KXn9kQxWQKOFRoRiWPQTg1XJAlauZSzoiSZm94WWG2t9wGH53GiATyGKA%3D%3D";

  const response = await axios.get(
    "/getUltraSrtFcstBeach" +
      `?serviceKey=${serviceKey}&base_date=20240311&base_time=1230&beach_num=1&dataType=JSON`
  );

  return response;
};
