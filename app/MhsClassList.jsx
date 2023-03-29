import styled from 'styled-components';
import { Cell } from './Cell';
import { useEffect} from 'react';
import { useMhsClass } from './contexts/globalContext';
import StudentList from './StudentList';

//import { MhsClassContext, MhsClassDispatchContext } from './contexts/globalContext';

const ListStyle = styled.div`
    width: ${({ width }) => width || '200px'};
    height: ${({ height }) => height || '900px'};
    left: 40px;
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

export default function MhsClassList() {
    //const [state, dispatch] = useReducer(getClassReducer, initialState);
    const { state, dispatch } = useMhsClass();

    useEffect(() => {
        fetch('http://localhost:3000/api/getClasses')
            .then(res => res.json())
            .then(data => dispatch({
                type: 'FETCH_CLASSES',
                payload: data.data
            }))
            .catch(error => { dispatch({ type: 'FETCH_ERROR' }) })
    }, [])

    if (state.mhsClasses.length == 0) return "loading"

    return (
        <>
        <ListStyle>
        {state.mhsClasses.map((c,index) => (
            <Cell onClick={() => {
                dispatch({
                    type: 'SELECT_CLASS',
                    mhsClassIndex: index,
                    mhsClassName: c.name,
                    mhsClassId: c.id,
                    mhsClassStart:  Math.floor(Date.now() / 1000)
                });
            }}
                key={index}
                border={index === state.mhsClassIndex ? "4px solid #30D5C8":""}>{c.name} </Cell>
        ))}
        </ListStyle>
        {state.mhsClassId ? <StudentList /> :""}
        </>
    );
    };
