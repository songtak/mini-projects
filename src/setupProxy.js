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
    createProxyMiddleware("/gardenList", {
      target: "http://api.nongsaro.go.kr/service/garden", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};

/** ===[ 기상청_전국 해수욕장 날씨 조회서비스 ]================================================================= */

/**
 * @description 해수욕장 초단기예보조회
 * @param {*} app
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getUltraSrtFcstBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
/**
 * @description 해수욕장 파고조회
 * @param {*} app
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getWhBuoyBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
/**
 * @description 해수욕장 조석조회 (6~8월에만 제공)
 * @param {*} app
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getTideInfoBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
/**
 * @description 해수욕장 일출일몰조회 (6~8월에만 제공)
 * @param {*} app
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getSunInfoBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
/**
 * @description 해수욕장 수온조회
 * @param {*} app
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getTwBuoyBeach", {
      target: "http://apis.data.go.kr/1360000/BeachInfoservice", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
