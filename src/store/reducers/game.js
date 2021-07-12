import { TURN_OVER, WIN, TIE, RESET } from '../actions';

const initialState = {
  sign: null,
  message: 'Start game with X',
  values: ['', '', '', '', '', '', '', '', ''],
  numberOfTurn: 0,
  isFinished: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TURN_OVER:
      return {
        ...state,
        ...action.payload,
      };
    case WIN:
      return {
        ...state,
        ...action.payload,
      };
    case TIE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
