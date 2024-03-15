import React, { useState } from "react";
import MarkerMap from "../libs/MarkerMap";

const BeachListPage = () => {
  return (
    <div>
      <div style={{ marginBottom: "24px", fontWeight: 700, fontSize: 28 }}>
        전국~ 해수욕장 정보
      </div>
      <MarkerMap />
    </div>
  );
};

export default BeachListPage;
