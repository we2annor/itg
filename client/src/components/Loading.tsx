import React from "react";

interface Props {
  message: string;
}

const Loading: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default Loading;
