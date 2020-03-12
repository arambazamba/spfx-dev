import * as React from "react";
import styles from "./ReactSkillsWp.module.scss";
import { IReactSkillsWpProps } from "./IReactSkillsWpProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { Hello } from "./Hello/Hello";
import { Skills } from "./Skills/Skills";

const logo: string = require("./logo.svg");

export default class ReactSkillsWp extends React.Component<
  IReactSkillsWpProps,
  {}
> {
  public render(): React.ReactElement<IReactSkillsWpProps> {
    return (
      <div className={styles.container}>
        <div className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h2>Welcome to SPFx using React</h2>
        </div>
        <div className={styles.AppIntro}>
          <Hello />
          <Skills removeMsg="Click on item to remove" />
        </div>
      </div>
    );
  }
}
