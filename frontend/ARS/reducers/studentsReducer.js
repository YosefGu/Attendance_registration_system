
export const studentsInitialState = {
    students: [],
  };

export const studentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return {
                ...state,
                students: action.payload
            }
        case 'ADD_STUDENT':
            return {
                ...state,
                students: [...state.students, action.payload]
            }
        case 'ADD_STUDENTS':
            return {
                ...state,
                students: [...state.students, ...action.payload]
            }
        case 'UPDATE_STUDENT':
            return {
                ...state,
                students: state.students.map(student => 
                    student._id.$oid === action.payload._id.$oid ? action.payload : student
                )
            }
        case 'DELETE_STUDENT':
            return {
                ...state,
                students: state.students.filter(student => student._id.$oid !== action.payload)
            }
    }
}