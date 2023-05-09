import { Cell, ListStyle } from './StyledComponents';
import { useEffect} from 'react';
import { useMhsClass } from './contexts/globalContext';

export default function StudentList() {
    const { state, dispatch } = useMhsClass();
    //545176888048
    useEffect(() => {
        fetch(`http://localhost:3000/api/students/${state.mhsClassId}`)
            .then(res => res.json())
            .then(data => dispatch({
                type: 'FETCH_STUDENTS',
                payload: data.data,
            }))
            .catch(error => { dispatch({ type: 'FETCH_ERROR' }) })
    }, [state.mhsClassId])

    if (state.students.length === 0) return <ListStyle>loading</ListStyle>

        return (
            <ListStyle>
                {state.students.map((s, index) => (
                    <Cell onClick={() => {
                        if (state.students[index].present) {
                            dispatch({
                                type: 'STUDENT_OUT',
                                studentIndex: index,
                            }
                            )
                        }
                        else {
                            dispatch({
                                type: 'STUDENT_IN',
                                studentIndex: index,
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