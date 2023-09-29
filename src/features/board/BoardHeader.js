import React from "react";
import PublicHeader from "../../components/PublicHeader";
import { useLocation } from "react-router-dom";

const BoardHeader = () => {
  const location = useLocation().pathname;
  const element = <p>{location}</p>;
  return <PublicHeader elements={element} />;
};

export default BoardHeader;
