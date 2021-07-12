import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
const Game = React.lazy(() => import('./pages/Game'));

import { Provider } from 'react-redux';
import { store } from './store';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={<div></div>}>
          <Switch>
            <Route
              exact
              path="/"
              name="Game"
              render={(props) => <Game {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
