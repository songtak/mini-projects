import axios from "axios";
import CryptoJS from "crypto-js";

// const OPENAI_ENDPOINT = "https://api.openai.com/v1/engines/davinci/completions";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/completions";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/images/generations";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// const OPENAI_ENDPOINT =
//   "https://api.openai.com/v1/models/gpt-3.5-turbo-instruct";

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

  // return response.data.choices[0].text.trim();
  return response.data.choices[0].message.content;
};
