const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getSeaTurtleMeta", {
      target: "http://apis.data.go.kr/B553482/SeaTurtleRouteService", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://api.nongsaro.go.kr/service/garden", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getUltraSrtFcstBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
