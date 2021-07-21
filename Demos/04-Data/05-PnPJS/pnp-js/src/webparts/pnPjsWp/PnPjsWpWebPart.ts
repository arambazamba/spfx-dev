import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PnPjsWpWebPart.module.scss';
import * as strings from 'PnPjsWpWebPartStrings';

import { sp } from '@pnp/sp/presets/all';
import { Skill } from './skills.model';

export interface IPnPjsWpWebPartProps {
    description: string;
}

export default class PnPjsWpWebPart extends BaseClientSideWebPart<IPnPjsWpWebPartProps> {
    public onInit(): Promise<void> {
        return super.onInit().then((_) => {
            sp.setup({
                spfxContext: this.context,
            });
            this.getItems();
        });
    }

    public render(): void {
        this.domElement.innerHTML = `
        <div class="${styles.pnPjsWp}">
            <div class="${styles.container}">
            <div class="${styles.row}">
                <div class="${styles.column}">
                <span class="${styles.title}">Skills using PnPJS</span>
                <div id="skills"></div>  
                </div>
            </div>
            </div>
        </div>`;
    }

    protected async getItems(): Promise<void> {
        const skills: Skill[] = await sp.web.lists.getByTitle('Skills').items.getAll();
        for (let sk of skills) {
            document.querySelector('#skills').insertAdjacentHTML('beforeend', `<div>${sk.Title} </div>`);
        }
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
