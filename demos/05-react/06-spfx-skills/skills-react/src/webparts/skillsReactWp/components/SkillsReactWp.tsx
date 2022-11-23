import * as React from 'react';
import styles from './SkillsReactWp.module.scss';
import { ISkillsReactWpProps } from './ISkillsReactWpProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import { Hello } from "./Hello/Hello";
import { Skills } from "./Skills/Skills";

const logo: string = require("./logo.svg");

export default class SkillsReactWp extends React.Component<ISkillsReactWpProps, {}> {
  public render(): React.ReactElement<ISkillsReactWpProps> {
    return (
      <div className={styles.container}>
        <div className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h2>Welcome to SPFx using React</h2>
        </div>
        <div className={styles.AppIntro}>
          <Hello />
          <Skills
            removeMsg="Click on item to remove"
            skills={this.props.skills}
            context={this.props.context}
          />
        </div>
      </div>
    );
  }
}
