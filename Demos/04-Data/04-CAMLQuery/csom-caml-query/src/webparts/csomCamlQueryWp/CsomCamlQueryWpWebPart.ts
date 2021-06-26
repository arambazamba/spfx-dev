import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

import styles from "./CsomCamlQueryWpWebPart.module.scss";
import * as strings from "CsomCamlQueryWpWebPartStrings";
import { NewsItem } from "../../news-model";

export interface ICsomCamlQueryWpWebPartProps {
  description: string;
}

export default class CsomCamlQueryWpWebPart extends BaseClientSideWebPart<ICsomCamlQueryWpWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.csomCamlQueryWp}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <p class="${
                styles.subTitle
              }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${styles.description}">${escape(
      this.properties.description
    )}</p>
                <h3>The news items:</h3>
              <div id='newsitems'></div>
            </div>
            
          </div>
        </div>
      </div>`;

    this.getNews().then((items: NewsItem[]) => {
      let html = "<div>";
      items.forEach((i) => {
        html += `<div>${i.title}</div>`;
      });
      html += "</div>";
      document.querySelector("#newsitems").innerHTML = html;
    });
  }

  public getNews(): Promise<NewsItem[]> {
    // Build a REST endpoint URL
    const restUrl: string =
      this.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/GetByTitle('News')/GetItems?$select=ID,Title,Body,Expires";

    const options: ISPHttpClientOptions = {
      headers: { "odata-version": "3.0" },
      body: `{'query': {
          '__metadata': {'type': 'SP.CamlQuery'},
          'ViewXml': '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">Demo News</Value></Eq></Where></Query></View>'
        }}`,
    };

    // Send the request and parse the response
    return new Promise<NewsItem[]>(
      (
        resolve: (options: NewsItem[]) => void,
        reject: (error: any) => void
      ) => {
        this.context.spHttpClient
          .post(restUrl, SPHttpClient.configurations.v1, options)
          .then((response: SPHttpClientResponse) => {
            response.json().then((items: any) => {
              const newsItems: NewsItem[] = items.value.map((item) => {
                return <NewsItem>{
                  id: item.ID,
                  title: item.Title,
                  body: item.Body,
                  expires: item.Expires,
                };
              });
              resolve(newsItems);
            });
          });
      }
    );
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
