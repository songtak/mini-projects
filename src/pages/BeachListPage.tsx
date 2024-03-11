import React from "react";
import { getBeachWeathers } from "../api";
import MarkerMap from "../libs/MarkerMap";

const BeachListPage = () => {
  //   const ddd = getBeachWeathers();

  //   console.log("ddd", ddd);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>전국 해수욕장 지도</div>
      <MarkerMap />
    </div>
  );
};

export default BeachListPage;
