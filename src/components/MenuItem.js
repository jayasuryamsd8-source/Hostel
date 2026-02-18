import React from "react";

function MenuItem({ name, image }) {
  return (
    <div className="menuCard">
      <img src={image} alt={name} />
      <div className="menuOverlay">{name}</div>
    </div>
  );
}

export default MenuItem;
