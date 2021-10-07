import React from "react";

import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map(
    (apt) => {
      const interview = getInterview(state, apt.interview);
      return (
        <Appointment
          key={apt.id}
          id={apt.id}
          time={apt.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}

        />
      );
    }
  );

  return (

    <main className="layout">


      <section className="sidebar">

        <img
          className="sidebar--centered style"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>


      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>

    </main>

  );
}
