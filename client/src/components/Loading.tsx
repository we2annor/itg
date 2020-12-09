import React from "react";

interface Props {
  message: string;
}

const Loading: React.FC<Props> = ({ message }) => {
  return <div data-testid="loading">{message}</div>;
};

export default Loading;
