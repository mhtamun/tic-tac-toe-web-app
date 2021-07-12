import _ from 'lodash';

export const TURN_OVER = 'TURN_OVER';
export const WIN = 'WIN';
export const TIE = 'TIE';
export const RESET = 'RESET';

export const turn = (slot) => (dispatch, getState) => {
  const { game } = getState();
  const { sign, values, numberOfTurn, isFinished } = game;

  if (isFinished) return;

  if (!_.isEqual(values[slot], '')) return;

  const newSign = sign === 'X' ? 'O' : 'X';
  const tempValues = values;
  tempValues.splice(slot, 1, newSign);
  const newValues = tempValues;

  dispatch({
    type: TURN_OVER,
    payload: {
      sign: newSign,
      message: `Now player ${newSign === 'X' ? 'O' : 'X'}\'s turn`,
      values: newValues,
      numberOfTurn: numberOfTurn + 1,
    },
  });
};

export const win = (sign) => (dispatch) => {
  dispatch({
    type: WIN,
    payload: {
      message: `Winner is ${sign}`,
      isFinished: true,
    },
  });
};

export const tie = () => (dispatch) => {
  dispatch({
    type: TIE,
    payload: {
      message: 'It is a tie',
      isFinished: true,
    },
  });
};

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
    payload: {
      sign: null,
      message: 'Start game with X',
      values: ['', '', '', '', '', '', '', '', ''],
      numberOfTurn: 0,
      isFinished: false,
    },
  });
};
