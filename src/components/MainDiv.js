import styled from 'styled-components';

const MainDiv = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    width: 100%;
    
    @media (max-width: 1080px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90%;
        width: 90%;
    }
    
    @media (max-width: 320px) {
        height: 100%;
        width: 100%;
    }
`;

export default MainDiv;
