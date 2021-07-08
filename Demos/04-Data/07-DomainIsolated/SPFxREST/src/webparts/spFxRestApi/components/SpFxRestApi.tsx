import * as React from "react";
import styles from "./SpFxRestApi.module.scss";
import { ISpFxRestApiProps } from "./ISpFxRestApiProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class SpFxRestApi extends React.Component<
  ISpFxRestApiProps,
  {}
> {
  public render(): React.ReactElement<ISpFxRestApiProps> {
    return (
      <div className={styles.spFxRestApi}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>HttpClient Demo</span>
            </div>
          </div>

          <div className={styles.row}>
            <img src={this.props.apolloMissionImage.links[0].href} />
            <div>
              <strong>Title:</strong>{" "}
              {this.props.apolloMissionImage.data[0].title}
            </div>
            <div>
              <strong>Keywords:</strong>
            </div>
            <ul className={styles.list}>
              {this.props.apolloMissionImage &&
                this.props.apolloMissionImage.data[0].keywords.map(
                  (keyword) => (
                    <li key={keyword} className={styles.item}>
                      {keyword}
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
