import * as React from "react";
import styles from "./SkillsReactV2.module.scss";
import { ISkillsReactV2Props } from "./ISkillsReactV2Props";
import { escape } from "@microsoft/sp-lodash-subset";

import { Hello } from "./Hello/Hello";
import { Skills } from "./Skills/Skills";

const logo: string = require("./logo.svg");

export default class SkillsReactV2 extends React.Component<
  ISkillsReactV2Props,
  any
> {
  constructor(props) {
    super(props);
  }

  public render(): React.ReactElement<SkillsReactV2> {
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
