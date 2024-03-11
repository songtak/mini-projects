import React from "react";
import { getTurtles } from "../api";

const GreenTurtlePage = () => {
  const ddd = getTurtles();
  console.log("ddd", ddd);

  return <div></div>;
};

export default GreenTurtlePage;
