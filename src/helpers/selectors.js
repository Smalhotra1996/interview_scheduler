export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];

  let appointmentList = [];

  for (let index in state.days) {
    let dayItem = state.days[index];
    if (dayItem.name === day) {
      appointmentList = dayItem.appointments;
    }
  }

  for (let index in appointmentList) {
    let aptId = appointmentList[index];
    if (aptId in state.appointments) {
      result.push(state.appointments[aptId]);
    }
  }

  return result;
}

export function getInterview(state, interview) {

  let result = interview;

  if (interview) {
    let id = interview.interviewer;
    if (id in state.interviewers) {
      result.interviewer = state.interviewers[id];
    }
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  let result = [];

  let interviewerList = [];

  for (let index in state.days) {
    let dayItem = state.days[index];
    if (dayItem.name === day) {
      interviewerList = dayItem.interviewers;
    }
  }

  for (let index in interviewerList) {
    let interviewerId = interviewerList[index];
    if (interviewerId in state.interviewers) {
      result.push(state.interviewers[interviewerId]);
    }
  }

  return result;
}