import * as React from "react";
import styles from "./DomainIsolatedWp.module.scss";
import { IDomainIsolatedWpProps } from "./IDomainIsolatedWpProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class DomainIsolatedWp extends React.Component<
  IDomainIsolatedWpProps,
  {}
> {
  public render(): React.ReactElement<IDomainIsolatedWpProps> {
    return (
      <div className={styles.domainIsolatedWp}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>AadHttpClient Demo</span>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <strong>Mail:</strong>
            </div>
            <ul className={styles.list}>
              {this.props.userItems &&
                this.props.userItems.map((user) => (
                  <li key={user.id} className={styles.item}>
                    <strong>ID:</strong> {user.id}
                    <br />
                    <strong>Email:</strong> {user.mail}
                    <br />
                    <strong>DisplayName:</strong> {user.displayName}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
