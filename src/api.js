import axios from "axios";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";

import {
  getNearBaseTimeInBeachInfoTimes,
  setVilageFcstBeach,
} from "./libs/helper";

// const OPENAI_ENDPOINT = "https://api.openai.com/v1/engines/davinci/completions";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/completions";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/images/generations";
// const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// const OPENAI_ENDPOINT =
//   "https://api.openai.com/v1/models/gpt-3.5-turbo-instruct";

const GARDEN_ENDPOINT = "http://api.nongsaro.go.kr/service/garden";

const WEATHER_ENDPOINT = "http://apis.data.go.kr/1360000/BeachInfoservice/";

const naver_map_service_key = process.env.REACT_APP_NAVER_MAP_SERVICE_KEY;
const open_data_service_key = process.env.REACT_APP_OPEN_DATA_SERVICE_KEY;
const ocean_service_key = process.env.REACT_APP_OCEAN_SERVICE_KEY;

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

export const gardenList = async () => {
  const api_key = "202403087MHPOVCUQJZBZ7SFUTBKG";
  console.log("=-=-=-=-=-=-=-gardenListttt");
  // const response = await axios.get(
  //   "http://api.nongsaro.go.kr/service/garden/gardenList" + `?apiKey=${api_key}`
  // );
  const response = await axios({
    method: "get",
    url: `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${api_key}`, // url을 변경해서 테스트해주세요
    // httpAgent: new http.Agent({ rejectUnauthorized: false }),
  }).then((res) => {
    console.log(res);
  });
  // const response = await axios.get("/gardenList" + `?apiKey=${api_key}`);
  return response;
};

export const gardenList2 = async () => {
  // const api_key = "202403087MHPOVCUQJZBZ7SFUTBKG";
  // console.log("=-=-=-=-=-=-=-gardenList222222");
  // const response = await axios.get("/gardenList" + `?apiKey=${api_key}`);
  // return response;
};

export const getTurtles = async () => {
  const serviceKey =
    "cFaqNVCtLPS%2Fu3KesQfPTGPRQq6V8KXn9kQxWQKOFRoRiWPQTg1XJAlauZSzoiSZm94WWG2t9wGH53GiATyGKA%3D%3D";

  const response = await axios.get("/getSeaTurtleMeta");

  return response;
};

/** ===[ 기상청_전국 해수욕장 날씨 조회서비스 ]================================================================= */

/**
 * @description 해수욕장 단기예보조회
 * @param {*} beachId
 * @returns
 */
export const getVilageFcstBeach = async (beachId) => {
  const base_time = getNearBaseTimeInBeachInfoTimes(
    Number(dayjs().format("HHmm"))
  );
  const response = await axios.get(
    WEATHER_ENDPOINT +
      `getVilageFcstBeach?serviceKey=${open_data_service_key}&base_date=${dayjs().format(
        "YYYYMMDD"
      )}&base_time=${base_time}&beach_num=${beachId}&dataType=JSON`
  );

  return setVilageFcstBeach(response.data.response.body?.items?.item);

  // return response.data.response.body?.items?.item;
};
/**
 * @description 해수욕장 파고조회
 * @param {*} beachId
 * @returns
 */
export const getWhBuoyBeach = async (beachId) => {
  const response = await axios.get(
    WEATHER_ENDPOINT +
      `getWhBuoyBeach?serviceKey=${open_data_service_key}&searchTime=${dayjs().format(
        "YYYYMMDDHHmm"
      )}&beach_num=${beachId}&dataType=JSON`
  );

  return response.data.response.body?.items?.item;
};
/**
 * @description 해수욕장 조석조회 (6~8월에만 제공)
 * @param {*} beachId
 * @returns
 */
export const getTideInfoBeach = async (beachId) => {
  const response = await axios.get(
    WEATHER_ENDPOINT +
      `getTideInfoBeach?serviceKey=${open_data_service_key}&base_date=${dayjs().format(
        "YYYYMMDD"
      )}&beach_num=${beachId}&dataType=JSON`
  );

  return response;
};
/**
 * @description 해수욕장 일출일몰조회 (6~8월에만 제공)
 * @param {*} beachId
 * @returns
 */
export const getSunInfoBeach = async (beachId) => {
  const response = await axios.get(
    WEATHER_ENDPOINT +
      `getSunInfoBeach?serviceKey=${open_data_service_key}&base_date=${dayjs().format(
        "YYYYMMDD"
      )}&beach_num=${beachId}&dataType=JSON`
  );

  return response;
};
/**
 * @description 해수욕장 수온조회
 * @param {*} beachId
 * @returns
 */
export const getTwBuoyBeach = async (beachId) => {
  const response = await axios.get(
    WEATHER_ENDPOINT +
      `getTwBuoyBeach?serviceKey=${open_data_service_key}&searchTime=${dayjs().format(
        "YYYYMMDDHHmm"
      )}&beach_num=${beachId}&dataType=JSON`
  );

  return response.data.response.body?.items?.item;
};
/**
 * @description 해수욕장 정보조회
 * @param {*} beachId
 * @returns
 */
export const getBeachInfoList = async (city) => {
  const response = await axios.get(
    "http://apis.data.go.kr/1192000/service/OceansBeachInfoService1/" +
      `getOceansBeachInfo1?ServiceKey=${naver_map_service_key}&SIDO_NM=${city}&numOfRows=100&resultType=JSON`
  );

  console.log("response", response.data.getOceansBeachInfo.item);
  return response;
};
