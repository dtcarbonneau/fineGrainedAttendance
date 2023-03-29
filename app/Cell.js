import styled from 'styled-components'

export const Cell = styled.div`
    width: ${({ width }) => width || '200px'};
    height: ${({ height }) => height || '40px'};
    border: ${({ border }) => border || ''};
    font-size: 16;
    padding-left: 16;
    padding-right: 16;
    display: flex;
    flex-direction: row;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    &:hover{box-shadow: 2px 4px 4px 4px rgba(0, 0, 0, 0.25)};
    background-color: #fffdd0;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    color: #AB2328
    `;
