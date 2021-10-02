export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];

  let appointmentList = [];

  for(let index in state.days){
    let dayItem = state.days[index];
    if (dayItem.name === day) {
      appointmentList = dayItem.appointments;
    }
  }

  for(let index in appointmentList) {
    let aptId = appointmentList[index];
    if(aptId in state.appointments){
      result.push(state.appointments[aptId]);
    }
  }

  return result;
}

export function getInterview(state, interview){

  if(interview) {
    let id = interview.interviewer;
    if(id in state.interviewers) {
      interview.interviewer = {};
      interview.interviewer = state.interviewers[id];
    }
  }

  return interview;
}