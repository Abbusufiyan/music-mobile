import React from "react";

const BgBox = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default BgBox;