import React from "react";
import { gardenList, gardenList2 } from "../api";

const HomeGardenPage = () => {
  const ddd = gardenList();
  const ddd2 = gardenList2();

  console.log("ddd", ddd);
  console.log("ddd2", ddd2);

  return <div></div>;
};

export default HomeGardenPage;
