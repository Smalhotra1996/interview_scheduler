import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    }
  );
  const formatSports = function (val) {
    if (val === 1) {
      return val + " spot remaining";
    } else if (val < 1) {
      return "no spots remaining";
    }
    return val + " spots remaining";
  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSports(props.spots)}</h3>
    </li>
  );
}