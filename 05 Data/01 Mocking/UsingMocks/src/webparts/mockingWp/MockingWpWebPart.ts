import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "MockingWpWebPartStrings";
import MockingWp from "./components/MockingWp";
import { IMockingWpProps } from "./components/IMockingWpProps";
import { ISPList } from "./ISPList";
import MockHttpClient from "./MockHttpClient";

export interface IMockingWpWebPartProps {
  description: string;
}

export default class MockingWpWebPart extends BaseClientSideWebPart<
  IMockingWpWebPartProps
> {
  public render(): void {
    this.getMockListData().then((lists: ISPList[]) => {
      const element: React.ReactElement<IMockingWpProps> = React.createElement(
        MockingWp,
        {
          description: this.properties.description,
          lists: lists
        }
      );

      ReactDom.render(element, this.domElement);
    });
  }

  private getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(
      (data: ISPList[]) => {
        return data;
      }
    );
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
