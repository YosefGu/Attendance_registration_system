
export const teamInitialState = {
    team: [],
}

  
export const teamReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TEAM':
        return { 
            team: action.payload 
        };
        case 'UPDATE_TEAM':
        return { 
          ...state,
          team: [...state.team, action.payload] 
        };
      default:
        return state;
    }
  };