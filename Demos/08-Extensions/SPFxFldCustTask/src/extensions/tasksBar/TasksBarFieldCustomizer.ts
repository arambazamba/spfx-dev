import { Log } from "@microsoft/sp-core-library";
import { override } from "@microsoft/decorators";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from "@microsoft/sp-listview-extensibility";

import * as strings from "TasksBarFieldCustomizerStrings";
import styles from "./TasksBarFieldCustomizer.module.scss";

export interface ITasksBarFieldCustomizerProperties {}

const LOG_SOURCE: string = "TasksBarFieldCustomizer";

export default class TasksBarFieldCustomizer extends BaseFieldCustomizer<
  ITasksBarFieldCustomizerProperties
> {
  @override
  public onInit(): Promise<void> {
    Log.info(
      LOG_SOURCE,
      "Activated TaskPriorityFieldCustomizer with properties:"
    );
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(
      LOG_SOURCE,
      `The following string should be equal: "TaskPriority" and "${strings.Title}"`
    );
    return Promise.resolve<void>();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    event.domElement.innerText = event.fieldValue + " edited";

    if (this.context.field.internalName === "Priority") {
      switch (event.fieldValue) {
        case "(1) Hoch":
          event.domElement.classList.add(styles.high);
          console.log("(1) High Switch Hit");
          break;
        case "(2) Normal":
          event.domElement.classList.add(styles.normal);
          console.log("(2) Normal Switch Hit");
          break;
        case "(3) Niedrig":
          event.domElement.classList.add(styles.low);
          console.log("(3) Low Switch Hit");
          break;
        default:
          break;
      }
    }

    console.log("Cell value: " + event.fieldValue);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    super.onDisposeCell(event);
  }
}
