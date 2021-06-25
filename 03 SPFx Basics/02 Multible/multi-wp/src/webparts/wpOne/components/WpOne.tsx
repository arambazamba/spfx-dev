import * as React from 'react';
import styles from './WpOne.module.scss';
import { IWpOneProps } from './IWpOneProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WpOne extends React.Component<IWpOneProps, {}> {
  public render(): React.ReactElement<IWpOneProps> {
    return (
      <div className={ styles.wpOne }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
