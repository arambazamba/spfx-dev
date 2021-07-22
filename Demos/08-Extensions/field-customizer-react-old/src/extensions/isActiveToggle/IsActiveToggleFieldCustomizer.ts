import * as React from "react";
import * as ReactDOM from "react-dom";

import { Log } from "@microsoft/sp-core-library";
import { override } from "@microsoft/decorators";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import * as strings from "IsActiveToggleFieldCustomizerStrings";
import IsActiveToggle, {
  IIsActiveToggleProps,
} from "./components/IsActiveToggle";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { SPPermission } from "@microsoft/sp-page-context";

export interface IIsActiveToggleFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = "IsActiveToggleFieldCustomizer";

export default class IsActiveToggleFieldCustomizer extends BaseFieldCustomizer<IIsActiveToggleFieldCustomizerProperties> {
  @override
  public async onInit(): Promise<void> {
    await super.onInit();

    sp.setup({
      spfxContext: this.context,
    });

    const items = await sp.web.lists
      .getByTitle("FldCustomizerToggle")
      .items.get();
    console.log("Items in list:", items);

    Log.info(
      LOG_SOURCE,
      "Activated IsActiveToggleFieldCustomizer with properties:"
    );
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(
      LOG_SOURCE,
      `The following string should be equal: "IsActiveToggleFieldCustomizer" and "${strings.Title}"`
    );
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const value: string = event.fieldValue;
    const id: string = event.listItem.getValueByName("ID").toString();
    const hasPermissions: boolean = this.context.pageContext.list.permissions.hasPermission(
      SPPermission.editListItems
    );

    const toggle: React.ReactElement<{}> = React.createElement(IsActiveToggle, {
      checked: value,
      id: id,
      disabled: !hasPermissions,
      onChanged: this.onToggleValueChanged.bind(this),
    });

    ReactDOM.render(toggle, event.domElement);
  }

  public onToggleValueChanged = (value: boolean, id: string) => {
    let updateObj: any = {};
    updateObj[this.context.field.internalName] = value;

    let etag: string = undefined;

    sp.web.lists
      .getByTitle(this.context.pageContext.list.title)
      .items.getById(parseInt(id))
      .get({
        headers: {
          Accept: "application/json;odata=minimalmetadata",
        },
      })
      .then(
        (item): Promise<any> => {
          etag = item["odata.etag"];
          return Promise.resolve((item as any) as any);
        }
      )
      .then(
        (item: any): Promise<any> => {
          let updateObj: any = {};
          updateObj[this.context.field.internalName] = value;
          return sp.web.lists
            .getByTitle(this.context.pageContext.list.title)
            .items.getById(parseInt(id))
            .update(updateObj, etag);
        }
      )
      .then(
        (result: any): void => {
          console.log(`Item with ID: ${id} successfully updated`);
        },
        (error: any): void => {
          console.log("Loading latest item failed with error: " + error);
        }
      );
  };

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
