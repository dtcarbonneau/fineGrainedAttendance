import styled from 'styled-components';
import { Cell, ListStyle } from './StyledComponents';
import { useEffect} from 'react';
import { useMhsClass } from './contexts/globalContext';

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

    if (state.mhsClasses.length == 0) return <ListStyle>loading</ListStyle>

    return (
        <ListStyle>
        {state.mhsClasses.map((c,index) => (
            <Cell onClick={() => {
                dispatch({
                    type: 'SELECT_CLASS',
                    mhsClassIndex: !state.mhsClassIndex ? index: null,
                    mhsClassName: !state.mhsClassIndex ? c.name: null,
                    mhsClassId: !state.mhsClassIndex ? c.id: null,
                });
            }}
                key={index}
                border={index === state.mhsClassIndex ? "4px solid #30D5C8":""}>{c.name} </Cell>
        ))}
        </ListStyle>
    );
    };
