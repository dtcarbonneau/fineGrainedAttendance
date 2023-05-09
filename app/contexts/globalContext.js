import { useReducer, createContext, useContext } from 'react';
import { format } from 'date-fns';

export const MhsClassContext = createContext();

const attendanceReducer = (state, action) => {
    switch (action.type) {
        case 'focusChange':
            console.log(state);
            return {...state, focusedInput: action.payload}
        case 'dateChange':
            return {
                ...state,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            }
        case 'FETCH_CLASSES':
            return { ...state, mhsClasses: action.payload }

        case 'DISPLAY_MODE':
            return {
                ...state,
                display: action.display,
            }
        case 'SELECT_CLASS':
            console.log(state)
            return {
                ...state,
                mhsClassIndex: action.mhsClassIndex,
                mhsClassId: action.mhsClassId,
                mhsClassName: action.mhsClassName,
            }

        case 'FETCH_STUDENTS':
            console.log(state)
            return {
                ...state,
                students: action.payload
            }

        case 'CLASS_START':
            console.log(state)
            return {
                ...state,
                attendance: [],
                classInSession: true,
                display: "students",
                timeClassStart: Math.floor(Date.now() / 1000),
                students: state.students.map((student) => {
                    return {
                        ...student,
                        present: true,
                        timeIn: Math.floor(Date.now() / 1000)
                    }
                }),
            }

        case 'CLASS_END':
            console.log(state)
            return {
                ...state,
                classInSession: false,
                display: "mhsClasses",
                timeClassEnd: action.timeClassEnd,
                //for students that are not present when class ends (absent or not returned)
                //update classEnd field. for students that are present update timeout and classEnd
                attendance: [...state.attendance.map((interval) => {
                    return { ...interval, time_class_end: action.timeClassEnd }
                            }),
                            ...state.students.filter((stu)=>stu.present).map((stu) => {
                                return {
                                    mhs_class: state.mhsClassName,
                                    time_class_start: state.timeClassStart,
                                    student: stu.email,
                                    time_in: stu.timeIn,
                                    time_out: action.timeClassEnd,
                                    time_class_end: action.timeClassEnd
                                }
                        })
                    ],
                students: state.students.map((stu) => {
                    return { ...stu, present: false }}),
                mhsClassIndex: null,
                mhsClassName: null,
                mhsClassId: null,
            }

        case 'STUDENT_OUT':
            console.log(state)
            return {
                ...state,
                studentIndex: action.studentIndex,
                attendance: [ ...state.attendance,
                    {
                        mhs_class: state.mhsClassName,
                        time_class_start: state.timeClassStart,
                        student: state.students[action.studentIndex].email,
                        time_in: state.students[action.studentIndex].timeIn,
                        time_out: Math.floor(Date.now() / 1000)
                    }],
                students: state.students.map((student, i) => {
                    if (i !== action.studentIndex) {
                        return student;
                    } else {
                        return {
                            ...student, present: false,
                            timeIn: null
                        };
                    }
                }),
            }
        case 'STUDENT_IN':
            console.log(state)
            return {
                ...state,
                studentIndex: action.studentIndex,
                students: state.students.map((student, i) => {
                    if (i !== action.studentIndex) {
                        return student;
                    } else {
                        return {
                            ...student, present: true,
                            timeIn: Math.floor(Date.now() / 1000)
                        };
                    }
                }),
            }
        case 'ATTENDANCE_SAVED':
            return {
                ...state,
                attendance:[]
            }
        case 'FETCH_ATTENDANCE':
            console.log(state)
            return {
                ...state,
                attendanceReport: action.payload
                //attendance:[]
            }
        default:
            return state
    }
}

export function MhsClassProvider({ children }) {
    const initialState = {
        classInSession: false,
        timeClassStart: null,
        startDate: null,
        endDate: null,
        focusedInput: null,
        loading: true,
        display: 'mhsClasses',
        mhsClasses: [],
        mhsClassIndex: null,
        mhsClassId: null,
        mhsClassName: null,
        students: [],
        studentIndex: null,
        attendance: [],
        attendanceReport: [],
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
