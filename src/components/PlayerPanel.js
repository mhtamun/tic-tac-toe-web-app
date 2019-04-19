import * as React from "react";
import styled from "styled-components";

import TextInput from "./TextInput";

const Border = styled.div`
    display: flex;
    flex-flop: row wrap;
    align-items: center
    justify-content: flex-start;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #DBDBDB;
    
    @media (max-width: 720px) {
        display: flex;
        flex-direction: column;
	    flex-flop: column wrap;
        align-items: center
        justify-content: center;
        height: 200px;
    }
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    margin: 30px;
    
    @media (max-width: 720px) {
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 80%;
        margin: 10px;
    }
`;

export default (props) => (
    <Border>
        <Box>
            <TextInput
                name={'playerOneName'}
                type={'text'}
                value={props.values.playerOneName}
                selected={props.turns.playerOneTurn}
                onChange={props.onChange}
            />
        </Box>
        <Box>
            <TextInput
                name={'playerTwoName'}
                type={'text'}
                value={props.values.playerTwoName}
                selected={props.turns.playerTwoTurn}
                onChange={props.onChange}
            />
        </Box>
    </Border>
);
