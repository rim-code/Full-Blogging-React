import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';
const Badge = ({ children, style }) => {
  const colorKey = {
    Fashion: "primary",
    Travel: "success",
    Fitness: "danger",
    Food: "warning",
    Tech: "info",
    Sports: "dark",
  };
  return (
    <h5 style={style}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
};

export default Badge;
