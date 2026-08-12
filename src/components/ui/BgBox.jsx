import React from "react";

const BgBox = ({ children, style, className = "" }) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default BgBox;
