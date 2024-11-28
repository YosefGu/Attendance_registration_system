export const attendanceInitialState = {
  attendance: { checkedIDs: [], uncheckedIDs: [] },
};

export const attendanceReducer = (state, action) => {
  switch (action.type) {
    case "SET_ATTENDANCE_LIST":
      return {
        attendance: action.payload,
      };
    case "ADD_TO_UNCHECKED_IDS":
      return {
        ...state,
        attendance: {
          ...state.attendance,
          uncheckedIDs: [...state.attendance.uncheckedIDs, action.payload],
        },
      };
    default:
      return state;
  }
};
