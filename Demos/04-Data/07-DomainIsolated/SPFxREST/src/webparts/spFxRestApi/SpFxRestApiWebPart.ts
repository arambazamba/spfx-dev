import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SpFxRestApiWebPartStrings";
import SpFxRestApi from "./components/SpFxRestApi";
import { ISpFxRestApiProps } from "./components/ISpFxRestApiProps";

import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

export interface ISpFxRestApiWebPartProps {
  description: string;
}

export default class SpFxRestApiWebPart extends BaseClientSideWebPart<ISpFxRestApiWebPartProps> {
  public render(): void {
    if (!this.renderedOnce) {
      this._getApolloImage().then((response) => {
        const element: React.ReactElement<ISpFxRestApiProps> = React.createElement(
          SpFxRestApi,
          {
            apolloMissionImage: response.collection.items[0],
          }
        );

        ReactDom.render(element, this.domElement);
      });
    }
  }

  private _getApolloImage(): Promise<any> {
    return this.context.httpClient
      .get(
        `https://images-api.nasa.gov/search?q=Apollo%204&media_type=image`,
        HttpClient.configurations.v1
      )
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then((jsonResponse) => {
        return jsonResponse;
      }) as Promise<any>;
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
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
