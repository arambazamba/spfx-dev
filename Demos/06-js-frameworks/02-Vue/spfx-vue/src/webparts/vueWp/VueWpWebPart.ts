import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'VueWpWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Importing Vue.js SFC
import VueWpComponent from './components/VueWp.vue';

export interface IVueWpWebPartProps {
  description: string;
}

export default class VueWpWebPart extends BaseClientSideWebPart<IVueWpWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    let el = new Vue({
      el: `#${id}`,
      render: h => h(VueWpComponent, {
        props: {
          description: this.properties.description
        }
      })
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
