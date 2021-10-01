//const{interviewers, interviewer,setInterviewer} = props;

import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = function (props) {
  const interviewerClassNames = classNames(
    "Interviewer__List",
    {
      "interviewer__List--number": props.number,
    }
  );

  const { selectedInterviewer, interviewers, setInterviewer } = props;
  const interviewermap = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === selectedInterviewer}
        setInterviewer={event => setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className={interviewerClassNames}>
      <h4 className="interviewers__header text--light ">Interviewer</h4>
      <ul className="interviewers__list">{interviewermap}</ul>
    </section>
  );
}

export default InterviewerList;
