import * as React from "react";
import styles from "./Hello.module.scss";

export interface HelloProps {}

export class Hello extends React.Component<HelloProps, any> {
  user = {
    firstName: "SPFx",
    lastName: "Developer"
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Hello, {this.formatName(this.user)}</h2>
      </div>
    );
  }

  formatName(user: any) {
    return user.firstName + " " + user.lastName;
  }
}
