
export const attendanceInitialState = {
    attendance: {},
}

  
export const attendanceReducer = (state, action) => {
    switch (action.type) {
      case 'SET_ATTENDANCE_LIST':
        return { 
            attendance: action.payload 
        };
      default:
        return state;
    }
  };