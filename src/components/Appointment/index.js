import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import "./styles.scss";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM_DELETE  = "CONFIRM_DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE="ERROR_SAVE";
  const ERROR_DELETE ="ERROR_DELETE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING,true);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE,true));
      
  }

  const del = function () {
    transition(DELETING,true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE,true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM_DELETE)} onEdit={() => transition(EDIT)} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onCancel={() => back()} interviewers={props.interviewers} onSave={(name, interviewer) => save(name, interviewer)} />}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === EDIT &&  <Form onCancel={() => back()} interviewers={props.interviewers} onSave={(name, interviewer) => save(name, interviewer)} name={props.interview.student} interviewer={props.interview.interviewer.id}  />}
      {mode === ERROR_DELETE && <Error onClose={()=> back()}/>}
      {mode === ERROR_SAVE && <Error onClose={()=> back()}/>}
      {mode === CONFIRM_DELETE && <Confirm onConfirm={() => del()} onCancel={() => back()} message={"Are you sure you want to delete?"} />}
      {mode === DELETING && <Status message={"DELETING"} />}
    </article>
  );
}
