import styled from 'styled-components';
import { Cell } from './Cell';
import { useEffect} from 'react';
import { useMhsClass } from './contexts/globalContext';

//import Cors from 'cors';

const ListStyle = styled.div`
    width: ${({ width }) => width || '200px'};
    height: ${({ height }) => height || '900px'};
    left: 300px;
    top: 80px;
    display: flex;
    flex-direction: column;
    flex-flow: column wrap;
    justify-content: start;
    align-items: center;
    padding-top: 8px;
    gap: 4px;
    &:hover{box-shadow: 2px 4px 4px 4px rgba(0, 0, 0, 0.25)};
    background-color: transparent;
    overflow: hidden;
    position: absolute;
    border-radius: 12px;
    color: #AB2328
    `;

// export function getStudent(mhsClassSelected) {
//     fetch(`http://localhost:3000/api/students/${state.mhsClasses[mhsClassSelected].id}`)
//         .then(res => res.json())
//         .then(data => { return data })
//     }
//     //             payload: data.data,
    //             mhsClass: state.mhsClasses[state.classSelected]
    //         }))
    //         .catch(error => { dispatch({ type: 'FETCH_ERROR' }) })
    //         : ""
    // }, [state.classSelected])

export default function StudentList() {
    const { state, dispatch } = useMhsClass();
    //545176888048
    const url =
    useEffect(() => {
        fetch(`http://localhost:3000/api/students/${state.mhsClassId}`)
            .then(res => res.json())
            .then(data => dispatch({
                type: 'FETCH_STUDENTS',
                payload: data.data,
            }))
            .catch(error => { dispatch({ type: 'FETCH_ERROR' }) })
    }, [state.mhsClassId])

    if (state.students.length === 0) return "loading"
    //if (state.classSelected) {
        //console.log(state.mhsStudents.present)
        return (
            <ListStyle>
                {state.students.map((s, index) => (
                    <Cell onClick={() => {
                        if (state.students[index].present) {
                            dispatch({
                                type: 'STUDENT_OUT',
                                studentIndex: index,
                                student: state.students[index].email,
                                timeOut: Math.floor(Date.now() / 1000),
                                present: false
                            }
                            )
                        }
                        else {
                            dispatch({
                                type: 'STUDENT_IN',
                                studentIndex: index,
                                student: state.students[index].email,
                                timeIn: Math.floor(Date.now() / 1000),
                                present: true
                            }
                            )
                        };
                    }}
                        key={index}
                        border={state.students[index].present ? "4px solid #30D5C8" : ""}> {s.firstName} </Cell>
                ))}
            </ListStyle>
        )

    };

//}

    //    console.log(item)




//export default function Component() {
//    const { data: session } = useSession();
//    console.log(session)
//        if (session) {
//            return (
//                <>
//                    Signed in as {session.user.name} <br />
//                    <button onClick={() => signOut()}> Sign out </button>
//                </>
//            )
//        }
//    return (
//        <>
//            Not signed in <br />
//            <buttom onClick={() => signIn()}>Sign In</buttom>
//        </>
//    );
//}