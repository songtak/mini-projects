const express = require("express");
const app = express();
const cors = require("cors");
//cors 모듈
const foodData = require("./foodData.js");

app.use(cors());
//app.use() : 미들웨어를 app에 바인딩

//app.get() : app.get(path, Handler)
//=>path로 요청이 들어오면 Handler가 동작
app.get("/", async (req, res) => {
  const { foodName } = req.query;
  //client에서 query로 전해준 데이터
  await foodData(foodName, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log("프록시 서버에서:", data);
      res.send(data);
    }
  });
});

app.listen(8080, () => {
  console.log("서버 8080포트 연결 성공");
});
