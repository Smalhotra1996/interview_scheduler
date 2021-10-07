
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData(initial) {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  const setDay = (day) => { setState({ ...state, day }) };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then(
      (all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      }
    );
  }, []);

  const bookInterview = async (id, interview) => {
    let edit = (state.appointments[id].interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(
      (day) => {
        if (day.name === state.day && !edit) {
          day.spots = day.spots - 1;
        }
        return day;
      }
    );

    console.log(days);
    return await axios.put("/api/appointments/" + id, { interview })
      .then(() => {
        setState(
          {
            ...state,
            appointments,
            days
          }
        );
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(
      (day) => {
        if (day.name === state.day) {
          day.spots = day.spots + 1;
        }
        return day;
      }
    );
    return axios.delete("/api/appointments/" + id)
      .then(() => {
        setState(
          {
            ...state,
            appointments,
            days
          }
        );
      });

  }


  return { state, setDay, bookInterview, cancelInterview };
}

