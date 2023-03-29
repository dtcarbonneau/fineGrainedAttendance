import { useReducer, createContext, useContext } from 'react';

export const MhsClassContext = createContext();

const attendanceReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CLASSES':
            console.log(state)
            return {
                loading: false,
                mhsClasses: action.payload,
                mhsClassIndex: state.mhsClassIndex,
                mhsClassId: state.mhsClassId,
                mhsClassName: state.mhsClassName,
                mhsClassStart: state.mhsClassStart,
                students: state.students,
                studentIndex: state.studentIndex,
                attendance: state.attendance,
                error: ''
            }

        case 'SELECT_CLASS':
            console.log(state)
            return {
                loading: false,
                mhsClasses: state.mhsClasses,
                mhsClassIndex: action.mhsClassIndex,
                mhsClassId: action.mhsClassId,
                mhsClassName: action.mhsClassName,
                mhsClassStart: action.mhsClassStart,
                students: state.students,
                studentIndex: state.studentIndex,
                attendance: state.attendance,
                error: ''
            }
        // In addtion to getting student list also need to initialize timeIn and present
        case 'FETCH_STUDENTS':
            console.log(state)
            return {
                loading: false,
                mhsClasses: state.mhsClasses,
                mhsClassIndex: state.mhsClassIndex,
                mhsClassId: state.mhsClassId,
                mhsClassName: state.mhsClassName,
                mhsClassStart: state.mhsClassStart,
                studentIndex: state.studentIndex,
                students: action.payload.map(student => {
                    return {
                        ...student, present: true,
                        timeIn: Math.floor(Date.now() / 1000)
                    }
                }),
                attendance: state.attendance,
                error: ''
            }

        case 'STUDENT_OUT':
            console.log(state)
            return {
                loading: false,
                mhsClasses: state.mhsClasses,
                mhsClassIndex: state.mhsClassIndex,
                mhsClassId: state.mhsClassId,
                mhsClassName: state.mhsClassName,
                studentIndex: action.studentIndex,
                attendance: [ ...state.attendance,
                    {
                        student: action.student,
                        mhsClass: state.mhsClassName,
                        timeIn: state.students[action.studentIndex].timeIn,
                        timeOut: action.timeOut,
                    }],
                students: state.students.map((student, i) => {
                    if (i !== action.studentIndex) {
                        return student;
                    } else {
                        return {
                            ...student, present: action.present,
                            timeIn: null
                        };
                    }
                }),
                error: 'Something went wrong!'
            }
        case 'STUDENT_IN':
            console.log(state)
            return {
                loading: false,
                mhsClasses: state.mhsClasses,
                mhsClassIndex: state.mhsClassIndex,
                mhsClassId: state.mhsClassId,
                mhsClassName: state.mhsClassName,
                studentIndex: action.studentIndex,
                students: state.students.map((student, i) => {
                    if (i !== action.studentIndex) {
                        return student;
                    } else {
                        return {
                            ...student, present: action.present,
                            timeIn: action.timeIn
                        };
                    }
                }),
                attendance: state.attendance,
                error: 'Something went wrong!'
            }
        default:
            return state
    }
}


export function MhsClassProvider({ children }) {
    const initialState = {
        loading: true,
        mhsClasses: [],
        mhsClassIndex: null,
        mhsClassId: null,
        mhsClassName: null,
        mhsClassStart: null,
        students: [],
        studentIndex: null,
        attendance: [],
        error: ''
        }
    const [state, dispatch] = useReducer(attendanceReducer, initialState);
    const value = {state, dispatch}

    return (
        <MhsClassContext.Provider value={value}>
                {children}
        </MhsClassContext.Provider>
    )
}

export function useMhsClass() {
    return useContext(MhsClassContext)
}
