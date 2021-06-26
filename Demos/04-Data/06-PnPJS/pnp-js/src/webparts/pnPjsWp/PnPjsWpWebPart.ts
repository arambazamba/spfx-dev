import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PnPjsWpWebPart.module.scss';
import * as strings from 'PnPjsWpWebPartStrings';

import { sp, Web } from '@pnp/sp/presets/all';

export interface IPnPjsWpWebPartProps {
    description: string;
}

export default class PnPjsWpWebPart extends BaseClientSideWebPart<IPnPjsWpWebPartProps> {
    public onInit(): Promise<void> {
        return super.onInit().then((_) => {
            sp.setup({
                spfxContext: this.context,
            });
        });
    }

    public render(): void {
        this.domElement.innerHTML = `
      <div class="${styles.pnPjsWp}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome to SharePoint!</span>
              <p class="${styles.subTitle}">Customize SharePoint experiences using Web Parts.</p>
              <p class="${styles.description}">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
              <div id="response"></div>  
            </div>
          </div>
        </div>
      </div>`;
        this.getTitle();
    }

    protected getTitle(): void {
        sp.web
            .select('Title')
            .get<{ Title: string }>()
            .then((w) => {
                this.domElement.querySelector('#response').innerHTML = `Current Web Title: ${w.Title}`;
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
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
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
