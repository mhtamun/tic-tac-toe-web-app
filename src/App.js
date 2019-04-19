import React, {Component} from 'react';

import MainDiv from "./components/MainDiv";
import ContentBorder from "./components/ContentBorder";
import Header from "./components/Header";
import PlayerPanel from "./components/PlayerPanel";
import Frame from './components/Frame';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: 'Player 1',
            playerTwoName: 'Player 2',
            playerOneTurn: true,
            currentSign: 'X',
            gameImage: {
                one: ['1,1', '1,2', '1,3'],
                two: ['2,1', '2,2', '2,3'],
                three: ['3,1', '3,2', '3,3'],
            },
            message: 'Start game!'
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick = (row, column) => (e) => {
        console.log('Event', e);
        console.log('Position', row, column);

        const playerOneTurn = this.state.playerOneTurn;
        const currentSign = this.state.currentSign;
        this.state.gameImage[row][column] = currentSign;

        this.setState({
            playerOneTurn: !playerOneTurn,
            currentSign: currentSign === 'X' ? 'O' : 'X',
        });
    };

    onChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });

        console.log('State', JSON.stringify(this.state));
    };

    render() {
        return (
            <div className="App">
                <MainDiv>
                    <ContentBorder>
                        <Header/>
                        <PlayerPanel
                            values={
                                {
                                    playerOneName: this.state.playerOneName,
                                    playerTwoName: this.state.playerTwoName
                                }
                            }
                            turns={
                                {
                                    playerOneTurn: this.state.playerOneTurn,
                                    playerTwoTurn: !this.state.playerOneTurn
                                }
                            }
                            onChange={this.onChange}
                        />
                        <div>{this.state.message}</div>
                        <Frame gameImage={this.state.gameImage} onClick={this.onClick}/>
                    </ContentBorder>
                </MainDiv>
            </div>
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        for (let key in this.state.gameImage){
            let temp = null;
            for (let i = 0; i < key.length; i++){
                console.log('key', key);
                console.log('i', i);
                console.log(this.state.gameImage[key][i]);
            }
        }

        if (this.state.gameImage['one'][0] === this.state.gameImage['one'][1] && this.state.gameImage['one'][1] === this.state.gameImage['one'][2]){
            alert('winner');
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    };
}

export default App;
