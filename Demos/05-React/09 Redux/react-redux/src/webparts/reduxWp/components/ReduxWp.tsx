import * as React from 'react';
import styles from './ReduxWp.module.scss';
import { IReduxWpProps } from './IReduxWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReduxWPState } from './IReduxWPState';
import { applyMiddleware, Store } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../store/reducer/RootReducer';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import ChildComponent1 from './ChildComponent1';
import ChildComponent2 from './ChildComponent2';
import ChildComponent3 from './ChildComponent3';
import RootComponent from './RootComponent';

export default class ReduxWp extends React.Component<IReduxWpProps, {}> {

  private store: Store<IReduxWPState>
  public constructor(props: IReduxWpProps) {
    super(props);
    this.store = createStore(RootReducer, applyMiddleware(thunk));
  };

  public render(): React.ReactElement<IReduxWpProps> {
    return (
      <div className={styles.reduxWp}>
        <Provider store={this.store}>
          <HashRouter>
            <Switch>
              <Route
                path="/"
                component={() => (
                  <div>
                    <RootComponent siteUrl={this.props.siteUrl} />
                    <ChildComponent1 />
                  </div>
                )}
              ></Route>
              <Route
                path="/2"
                component={() => (
                  <div>
                    <RootComponent siteUrl={this.props.siteUrl} />
                    <ChildComponent2 />
                  </div>
                )}
              ></Route>
              <Route
                path="/3"
                component={() => (
                  <div>
                    <RootComponent siteUrl={this.props.siteUrl} />
                    <ChildComponent3 />
                  </div>
                )}
              ></Route>
            </Switch>
          </HashRouter>
        </Provider>
      </div>
    );
  }
}
