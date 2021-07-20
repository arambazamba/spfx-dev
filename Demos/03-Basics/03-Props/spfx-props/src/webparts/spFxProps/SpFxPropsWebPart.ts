import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';

import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneLabel,
    PropertyPaneCheckbox,
    PropertyPaneDropdown,
    PropertyPaneLink,
    PropertyPaneSlider,
    PropertyPaneToggle,
    IPropertyPaneDropdownOption,
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxPropsWebPart.module.scss';
import * as strings from 'SpFxPropsWebPartStrings';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ISpFxPropsWebPartProps {
    description: string;
    labelField: string;
    textboxField: string;
    multilineTextboxField: string;
    checkboxField: boolean;
    dropdownField: string;
    linkField: string;
    sliderField: number;
    toggleField: boolean;
    customField: string;
    listName: string;
}

export default class SpFxPropsWebPart extends BaseClientSideWebPart<ISpFxPropsWebPartProps> {
    private _options: IPropertyPaneDropdownOption[];

    protected onInit(): Promise<void> {
        return this.getLists().then((lists) => {
            this._options = lists.map((list) => {
                return {
                    key: list.Id,
                    text: list.Title,
                };
            });
        });
    }

    protected get disableReactivePropertyChanges(): boolean {
        return true;
    }

    public render(): void {
        this.domElement.innerHTML = `
      <div class="${styles.spFxProps}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SPFx!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>

              <p class="ms-font-l ms-fontColor-white">Textbox value: ${this.properties.textboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Multi-line Textbox value: ${this.properties.multilineTextboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Checkbox checked: ${this.properties.checkboxField}</p>
              <p class="ms-font-l ms-fontColor-white">Dropdown selected value: ${this.properties.dropdownField}</p>
              <p class="ms-font-l ms-fontColor-white">Slider value: ${this.properties.sliderField}</p>
              <p class="ms-font-l ms-fontColor-white">Toggle on: ${this.properties.toggleField}</p>
            </div>
          </div>
        </div>
      </div>`;
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
                                PropertyPaneLabel('labelField', {
                                    text: 'Label text',
                                }),
                                PropertyPaneTextField('textboxField', {
                                    label: 'Textbox label',
                                }),
                                PropertyPaneTextField('multilineTextboxField', {
                                    label: 'Multi-line Textbox label',
                                    multiline: true,
                                }),
                                PropertyPaneCheckbox('checkboxField', {
                                    text: 'Checkbox text',
                                }),
                                PropertyPaneDropdown('dropdownField', {
                                    label: 'Dropdown label',
                                    options: [
                                        { key: '1', text: 'Option 1' },
                                        { key: '2', text: 'Option 2' },
                                        { key: '3', text: 'Option 3' },
                                    ],
                                }),
                                PropertyPaneLink('linkField', {
                                    text: 'Link text',
                                    href: 'https://dev.office.com/sharepoint/docs/spfx',
                                    target: '_blank',
                                }),
                                PropertyPaneSlider('sliderField', {
                                    label: 'Slider label',
                                    min: 0,
                                    max: 100,
                                }),
                                PropertyPaneToggle('toggleField', {
                                    label: 'Toggle label',
                                    onText: 'On',
                                    offText: 'Off',
                                }),
                                PropertyPaneDropdown('listName', {
                                    label: 'Select a list',
                                    selectedKey: this._options.length > 0 ? this._options[0].key : null,
                                    options: this._options,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }

    private getLists(): Promise<any> {
        if (Environment.type === EnvironmentType.Local) {
            return new Promise<any>((resolve) => {
                resolve([
                    { Id: '1', Title: 'Mock List 1' },
                    { Id: '2', Title: 'Mock List 2' },
                ]);
            });
        } else {
            const qry: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`;
            return this.context.spHttpClient
                .get(qry, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((json: any) => {
                    let arr: { Id: string; Title: string }[] = json.value;
                    return arr;
                });
        }
    }
}
