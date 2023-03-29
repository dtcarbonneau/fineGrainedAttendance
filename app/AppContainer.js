import styled from 'styled-components'

export const AppContainer = styled.div`
    width: ${({ width }) => width || '1200px'};
    height: ${({ height }) => height || '800px'};
    font-size: 16;
    padding-left: 0;
    padding-right: 0;
    display: flex;
    flex-direction: column;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
    &:hover{box-shadow: 2px 4px 4px 4px rgba(0, 0, 0, 0.25)};
    background-color: # #555555;
    overflow: hidden;
    position: absolute;
    border-radius: 0px;
    color: #AB2328
    `;
