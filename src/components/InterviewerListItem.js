import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = function (props) {
  const { key, name, avatar, selected, setInterviewer } = props;

  const interviwerItemClass = classNames(
    "interviewers__item",
    {
       "interviewers__item--selected": selected,
    }
  );
  const interviewerItemImageClass = classNames(
    "interviewers__item-image",
    {
       "interviewers__item-image--selected": selected,
    }
  );
  return (
    <li className={interviwerItemClass} onClick={setInterviewer}>
      <img
        className={interviewerItemImageClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
export default InterviewerListItem;
