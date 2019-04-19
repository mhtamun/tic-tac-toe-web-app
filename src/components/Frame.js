import * as React from "react";
import styled from "styled-components";

const Border = styled.div`
    display: flex;
    align-items: center;
	height: 720px;
	width: 100%;
`;

const Table = styled.table`
    height: 100%;
	width: 100%;
`;

const Row = styled.tr`
    display: flex;
    flex-flop: row wrap;
    align-items: center
    justify-content: center;
    height: ${720 / 3}px;
    width: 100%;
`;

const Column = styled.td`
    display: flex;
    align-items: center
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const Box = styled.div`
    display: flex;
    flex-flop: row wrap;
    align-items: center
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
	border: 1px solid #DBDBDB;
	cursor:pointer;
	color: #D3D3D3;
	font-family: Roboto;
	font-size: 50px;
`;

export default (props) => (
    <Border>
        <Table>
            <Row>
                <Column>
                    <Box onClick={props.onClick('one', 0)}>{props.gameImage.one[0]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('one', 1)}>{props.gameImage.one[1]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('one', 2)}>{props.gameImage.one[2]}</Box>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Box onClick={props.onClick('two', 0)}>{props.gameImage.two[0]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('two', 1)}>{props.gameImage.two[1]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('two', 2)}>{props.gameImage.two[2]}</Box>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Box onClick={props.onClick('three', 0)}>{props.gameImage.three[0]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('three', 1)}>{props.gameImage.three[1]}</Box>
                </Column>
                <Column>
                    <Box onClick={props.onClick('three', 2)}>{props.gameImage.three[2]}</Box>
                </Column>
            </Row>
        </Table>
    </Border>
);
