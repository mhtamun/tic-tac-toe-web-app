import * as React from "react";
import styled from "styled-components";

import {gql} from 'apollo-boost';
import {graphql} from "react-apollo";

const getGamesQuery = gql`
    {
    games{
            id, winner, player_one_name, player_one_sign, player_two_name, player_two_sign
        }
    }
`;

const Border = styled.div`
margin 30px;
    display: flex;
        flex-direction: column;
	    flex-flop: column wrap;
        align-items: center;
        justify-content: flex-start;
    height: auto;
    width: 720px;
    
    @media (max-width: 720px) {
        display: flex;
        flex-direction: column;
	    flex-flop: column wrap;
        align-items: center
        justify-content: center;
        height: 200px;
    }
`;

const Header = styled.div`
height: auto;
    width: 100%;
    text-align: left;
    color: #000;
	font-family: Roboto;
	font-size: 20px;
	
	@media (max-width: 320px) {
	    font-size: 20px;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
    width: 100%;
    padding: 10px;
    margin: 10px;
    
    border: 1px solid #DBDBDB;
    
    @media (max-width: 720px) {
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 80%;
        margin: 10px;
    }
`;

const Text = styled.div`
    height: auto;
    width: auto;
    text-align: center;
    color: #000;
	font-family: Roboto;
	font-size: 20px;
	
	@media (max-width: 320px) {
	    font-size: 20px;
    }
`;

const GameScores = (props) => {
    console.log(props);

    function displayGames() {
        const data = props.data;
        console.log('data', data);
        if(data === undefined){
            alert('Please start the server and try again.');
        }
        if (data.loading) {
            return (<Header>Loading...</Header>)
        } else {
            return data.games.map(game => {
                return (<Box key={game.id}>
                    <Text>{`Winner: ${game.winner === 1 ? game.player_one_name : game.player_two_name}`}</Text>
                    <Text>{`Player 1 name: ${game.player_one_name}`}</Text>
                    <Text>{`Player 1 sign: ${game.player_one_sign}`}</Text>
                    <Text>{`Player 2 name: ${game.player_two_name}`}</Text>
                    <Text>{`Player 2 sign: ${game.player_two_sign}`}</Text>
                </Box>)
            });
        }
    }

    return (
        <Border>
            <Header>Game Scores:</Header>
            {displayGames()}
        </Border>
    )
};

export default graphql(getGamesQuery)(GameScores);
