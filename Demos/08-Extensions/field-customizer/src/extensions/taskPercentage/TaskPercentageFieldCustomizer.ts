import { Log } from "@microsoft/sp-core-library";
import { override } from "@microsoft/decorators";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import * as strings from "TaskPercentageFieldCustomizerStrings";
import styles from "./TaskPercentageFieldCustomizer.module.scss";

export interface ITaskPercentageFieldCustomizerProperties {
  greenMinLimit?: string;
  yellowMinLimit?: string;
}

const LOG_SOURCE: string = "TaskPercentageFieldCustomizer";

export default class TaskPercentageFieldCustomizer extends BaseFieldCustomizer<ITaskPercentageFieldCustomizerProperties> {
  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(
      LOG_SOURCE,
      "Activated TaskPercentageFieldCustomizer with properties:"
    );
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(
      LOG_SOURCE,
      `The following string should be equal: "TaskPercentageFieldCustomizer" and "${strings.Title}"`
    );
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    event.domElement.classList.add(styles.cell);

    // determine color and text to use
    const fieldValue = parseInt(event.fieldValue);
    let filledColor: string = "";

    if (isNaN(fieldValue) || fieldValue === 0) {
      event.domElement.innerHTML = `
        <div class="${styles.TaskPercentage}">
          <div class="">
            <div style="width: 100px; color:#000000;">
              &nbsp; no progress
            </div>
          </div>
        </div>
      `;
    } else {
      if (fieldValue >= parseInt(this.properties.greenMinLimit)) {
        filledColor = "#00ff00";
      } else if (fieldValue >= parseInt(this.properties.yellowMinLimit)) {
        filledColor = "#ffff00";
      } else {
        filledColor = "#ff0000";
      }

      event.domElement.innerHTML = `
        <div class="${styles.TaskPercentage}">
          <div class="${styles.filledBackground}">
            <div style="width: ${fieldValue}px; background:${filledColor}; color:#000000;">
              &nbsp; ${fieldValue}% completed
            </div>
          </div>
        </div>`;
    }
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
