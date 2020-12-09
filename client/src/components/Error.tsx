import React from "react";

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return <div data-testid="error-div">{message}</div>;
};

export default Error;
