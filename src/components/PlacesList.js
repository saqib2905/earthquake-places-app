import React from "react";

const PlacesList = props => (
  <ul className="places-list">
    {props.data.map(({ id, properties }, i) => {
      const { place, mag, magType } = properties;
      return (
        <li key={i}>
          {id} : {place} : {mag} : {magType}
        </li>
      );
    })}
  </ul>
);

export default PlacesList;
