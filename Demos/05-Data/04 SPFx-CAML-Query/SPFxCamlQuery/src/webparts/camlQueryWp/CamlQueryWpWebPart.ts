import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';
import styles from './CamlQueryWpWebPart.module.scss';
import * as strings from 'CamlQueryWpWebPartStrings';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface NewsItem{
  id: string,
  title: string,
  body: string,
  expires: Date
}

export interface ICamlQueryWpWebPartProps {
  description: string;
}

export default class CamlQueryWpWebPartWebPart extends BaseClientSideWebPart<ICamlQueryWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.camlQueryWp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;

      this.getNews().then(items=>console.log(items))
  }

  public getNews()
  : Promise<NewsItem[]> {
       // Build a REST endpoint URL
       const restUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('News')/GetItems?$select=ID,Title,Body,Expires";

       const options: ISPHttpClientOptions = {
        headers: {'odata-version':'3.0'},
        body: `{'query': {
          '__metadata': {'type': 'SP.CamlQuery'},
          'ViewXml': '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">Demo News</Value></Eq></Where></Query></View>'
        }}`
      };

       // Send the request and parse the response
       return new Promise<NewsItem[]> 
       ((resolve: (options: NewsItem[]) => void, reject: (error: any) => void) => {
           this.context.spHttpClient
               .post(restUrl, SPHttpClient.configurations.v1, options)
               .then((response: SPHttpClientResponse) => {
                   response.json().then((items: any) => {
                       const newsItems: NewsItem[] = items.value.map(item => {
                           return<NewsItem> ({
                               id: item.ID,
                               title: item.Title,
                               body: item.Body,
                               expires: item.Expires
                           })
                       })
                       resolve(newsItems);
                   });
               });
       });
   }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('description', {
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
