const fetch = require("node-fetch");
const api_key = "202403087MHPOVCUQJZBZ7SFUTBKG";
const GARDEN_ENDPOINT = "http://api.nongsaro.go.kr/service/garden";

const gardenData = (foodName, callback) => {
  const url = `${GARDEN_ENDPOINT}/waterCycleList?apiKey=${api_key}`;
  fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      const foodData = data.body;
      callback(undefined, foodData);
    })
    .catch((error) => {
      console.log("에러 발생", error);
      callback(error);
    });
};

module.exports = gardenData;
