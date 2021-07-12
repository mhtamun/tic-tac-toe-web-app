import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, createLogger()))
);
