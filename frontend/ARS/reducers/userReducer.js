export const userInitialState = {
    userDetails: {},
  };

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return { 
        userDetails: action.payload 
      };
    default:
      return state;
  }
};