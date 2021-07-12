import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { turn, win, tie, reset } from '../store/actions';
import _ from 'lodash';

const themeColor1 = '#83C8E4';
const themeColor1Dark = '#43ADD9';
const themeColor2 = '#95D8C6';
const themeColor2Dark = '#5AC5B5';
const primaryColor = '#F7EAC6';
const accentColor = '#F4F7E2';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10vmin;
  display: grid;
  place-items: center center;
  background: linear-gradient(to right, ${themeColor1} 0%, ${themeColor2} 100%);
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20vmin);
  grid-template-rows: repeat(3, 20vmin);
  grid-gap: 1vmin;
  margin: 2vmin;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${primaryColor};
  border: 0.25vmin solid ${primaryColor};
  border-radius: 2vmin;
  box-shadow: 0 1vmin 2vmin -1vmin rgba(0, 0, 0, 0.75);

  &:hover,
  active {
    background: ${accentColor};
    border: 0.25vmin solid ${accentColor};
  }
`;

const ButtonContent = styled.span`
  font-size: 12vmin;
  font-weight: bold;
  color: ${(props) => (props.sign === 'X' ? themeColor1Dark : themeColor2Dark)};
`;

const Message = styled.h3`
  color: #737373;
  text-align: center;
  margin-top: 1vmin;
`;

const ReplayButton = styled.button`
  background: ${primaryColor};
  border-radius: 1vmin;

  &:hover,
  active {
    background: ${accentColor};
  }
`;

const Game = (props) => {
  const {
    values,
    message,
    sign,
    numberOfTurn,
    isFinished,
    turn,
    win,
    tie,
    reset,
  } = props;

  const executeRule = (rule, slots) => {
    console.debug('rule', rule);

    const definer = slots[rule[0]];
    console.debug('definer', definer);

    if (_.isEqual(definer, '')) return true;

    return _.some(rule, (index) => {
      console.debug(index, slots[index]);

      return !_.isEqual(slots[index], definer);
    });
  };

  useEffect(() => {
    console.debug('values', values);
    console.debug('message', message);
    console.debug('sign', sign);
    console.debug('numberOfTurn', numberOfTurn);

    if (numberOfTurn === 0) return;

    if (numberOfTurn >= 9) {
      tie();
    }

    // game rules
    const gameRules = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // execute rules
    for (let i = 0; i < _.size(gameRules); i++) {
      const isNotWin = executeRule(gameRules[i], values);
      console.debug('isNotWin', isNotWin);

      if (!isNotWin) {
        console.debug(`${sign} is winner`);

        if (sign) win(sign);
      }
    }
  }, [values, message, sign]);

  return (
    <Container>
      <Board>
        {values &&
          _.size(values) > 0 &&
          _.map(values, (value, index) => (
            <Button
              key={index}
              onClick={() => {
                turn(index);
              }}
            >
              <ButtonContent sign={value}>{value}</ButtonContent>
            </Button>
          ))}
      </Board>
      <Message>{message}</Message>
      {isFinished && (
        <ReplayButton
          onClick={() => {
            reset();
          }}
        >
          Replay
        </ReplayButton>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { ...state.game };
};

const mapDispatchToProps = { turn, win, tie, reset };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
