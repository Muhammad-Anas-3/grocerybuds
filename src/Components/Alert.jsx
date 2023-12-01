import { React, useEffect } from "react";

function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <p
      className={`alert alert-${type}`}
      style={{ backgroundColor: type === "success" ? "#d5fbd5" : "#ffe8e8" }}
    >
      {msg}
    </p>
  );
}

export default Alert;
