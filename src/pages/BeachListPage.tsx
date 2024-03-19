import React, { useState } from "react";
import MarkerMap from "../libs/MarkerMap";
import { beachList } from "../assets/beachList";

const BeachListPage = () => {
  return (
    <div>
      <div>내가 보려고 만든</div>
      <div style={{ marginBottom: "24px", fontWeight: 700, fontSize: 28 }}>
        전국~ 해수욕장 정보
      </div>
      <MarkerMap />
      <div style={{ marginTop: 44, color: "gray", fontSize: 14 }}>
        정보 : 기상청 제공
      </div>
    </div>
  );
};

export default BeachListPage;
