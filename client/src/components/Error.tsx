import { stringify } from "querystring";
import React from "react";

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default Error;
