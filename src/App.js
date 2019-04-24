import React, {Component} from 'react';
import ApolloProviderWrapper from './ApolloProviderWrapper';
import {graphql, compose} from "react-apollo";
import {addGameMutation} from "./queries/mutation";

import MainDiv from "./components/MainDiv";
import ContentBorder from "./components/ContentBorder";
import Header from "./components/Header";
import PlayerPanel from "./components/PlayerPanel";
import Message from "./components/Message";
import Frame from './components/Frame';
import GameScores from './components/GameScores';

import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class App extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getInitialState = () => {
        return {
            playerOneName: 'Player 1',
            playerTwoName: 'Player 2',
            playerOneTurn: true,
            currentSign: 'X',
            message: 'Start game with player 1!',
            gameImage: {
                one: ['', '', ''],
                two: ['', '', ''],
                three: ['', '', ''],
            }
        };
    };

    onClick = (row, column) => (e) => {
        console.log('Event', e);
        console.log('Position', row, column);

        const {playerOneName, playerTwoName, playerOneTurn, currentSign, message, gameImage} = this.state;

        //Game draw logic start here
        let itemCount = 0;
        for (let row in gameImage) {
            console.log('row', row);

            for (let column = 0; column < 3; column++) {
                if (gameImage[row][column] !== '') {
                    itemCount++
                }
            }
        }
        console.log('itemCount', itemCount);
        if (itemCount === 7) {
            console.log('Drawn');
            this.setState({
                message: 'Match Drawn! Please refresh the'
            });
        } else {
            const tempPlayerOneTurn = playerOneTurn;
            const tempCurrentSign = currentSign;

            const tempGameImage = {...gameImage};
            tempGameImage[row][column] = tempCurrentSign;

            this.setState({
                playerOneTurn: !tempPlayerOneTurn,
                currentSign: tempCurrentSign === 'X' ? 'O' : 'X',
                message: tempPlayerOneTurn ? `Turn for ${playerTwoName}` : `Turn for ${playerOneName}`,
                gameImage: tempGameImage
            });
        }
        //Game draw logic end here
    };

    onChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    showWinningMessage = () => {

        const {playerOneTurn, playerOneName, playerTwoName} = this.state;

        console.log('props', this.props);
        this.props.addGameMutation({
            variables: {
                winner: playerOneTurn ? 2 : 1,
                player_one_name: playerOneName,
                player_one_sign: "X",
                player_two_name: playerTwoName,
                player_two_sign: "O"
            }
        });

        confirmAlert({
            title: 'Congratulations!',
            message: playerOneTurn ? `${playerTwoName} has won!! Want to replay?` : `${playerOneName} has won!! Want to replay?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        window.location.reload();
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        window.close();
                    }
                }
            ]
        });
    };

    render() {

        const {playerOneName, playerTwoName, playerOneTurn, message, gameImage} = this.state;

        return (
            <div className="App">
                <MainDiv>
                    <ContentBorder>
                        <Header/>
                        <PlayerPanel
                            values={
                                {
                                    playerOneName,
                                    playerTwoName
                                }
                            }
                            turns={
                                {
                                    playerOneTurn: playerOneTurn,
                                    playerTwoTurn: !playerOneTurn
                                }
                            }
                            onChange={this.onChange}
                        />
                        <Message message={message}/>
                        <Frame gameImage={gameImage} onClick={this.onClick}/>
                    </ContentBorder>
                    <GameScores/>
                </MainDiv>
            </div>
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');

        const {gameImage} = this.state;

        //Game winning logic start here --
        //Row check
        for (let row in gameImage) {
            console.log('row', row);
            let previousSign = null;
            let matchCount = 0;
            for (let column = 0; column < 3; column++) {
                console.log('column', column);
                console.log('gameImage[row][column]', gameImage[row][column]);
                if (previousSign === gameImage[row][column] && gameImage[row][column] !== '') {
                    matchCount++;
                }
                previousSign = gameImage[row][column];
            }
            if (matchCount === 2) {
                console.log('Winner');
                this.showWinningMessage();
            }
        }

        //Column check
        for (let column = 0; column < 3; column++) {
            console.log('column', column);
            let previousSign = null;
            let matchCount = 0;
            for (let row in gameImage) {
                console.log('row', row);
                console.log('gameImage[row][column]', gameImage[row][column]);
                if (previousSign === gameImage[row][column] && gameImage[row][column] !== '') {
                    matchCount++;
                }
                previousSign = gameImage[row][column];
            }
            if (matchCount === 2) {
                console.log('Win');
                this.showWinningMessage();
            }
        }

        //Diagonal check
        console.log('gameImage[\'one\'][0]', gameImage['one'][0]);
        console.log('gameImage[\'two\'][1]', gameImage['two'][1]);
        console.log('gameImage[\'three\'][2]', gameImage['three'][2]);
        if (gameImage['one'][0] === gameImage['two'][1] && gameImage['two'][1] === gameImage['three'][2] && gameImage['three'][2] !== '') {
            this.showWinningMessage();
        }
        console.log('gameImage[\'one\'][2]', gameImage['one'][2]);
        console.log('gameImage[\'two\'][1]', gameImage['two'][1]);
        console.log('gameImage[\'three\'][0]', gameImage['three'][0]);
        if (gameImage['one'][2] === gameImage['two'][1] && gameImage['two'][1] === gameImage['three'][0] && gameImage['three'][0] !== '') {
            this.showWinningMessage();
        }
        //Game winning logic end here
    }

    componentDidMount() {
        console.log('componentDidMount');
    };
}

export default compose(
    ApolloProviderWrapper,
    graphql(addGameMutation, {name: "addGameMutation"})
)(App);
