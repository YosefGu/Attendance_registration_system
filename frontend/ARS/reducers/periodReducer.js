export const periodInitialState = {
  periodData: {},
};

export const periodReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERIOD_DATA":
      return {
        periodData: action.payload,
      };
    default:
      return state;
  }
};
