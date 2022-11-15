import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import styles from './EnterpriseSkillsWpWebPart.module.scss';
import * as strings from 'EnterpriseSkillsWpWebPartStrings';

export interface IEnterpriseSkillsWpWebPartProps {
    skillsClient: AadHttpClient;
}

export default class EnterpriseSkillsWpWebPart extends BaseClientSideWebPart<IEnterpriseSkillsWpWebPartProps> {
    private skillsClient: AadHttpClient;

    protected onInit(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
            this.context.aadHttpClientFactory.getClient('6bc8bca8-5866-405d-b236-9200bdbb73c0').then(
                (client: AadHttpClient): void => {
                    this.skillsClient = client;
                    resolve();
                },
                (err) => reject(err)
            );
        });
    }

    public render(): void {
        this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'orders');

        this.skillsClient
            .get('https://spfx-dev-26951.azurewebsites.net/api/getSkills', AadHttpClient.configurations.v1)
            .then((res: HttpClientResponse): Promise<any> => {
                return res.json();
            })
            .then(
                (skills: any): void => {
                    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
                    this.domElement.innerHTML = `
                      <div class="${styles.container}">
                        <div class="${styles.row}">
                          <div class="${styles.column}">
                            <span class="${styles.title}">Orders</span>
                            <p class="${styles.description}">
                              <ul>
                                ${skills.map((skill) => `<li>${skill.rep} $${skill.total}</li>`).join('')}
                              </ul>
                            </p>
                            <a href="https://aka.ms/spfx" class="${styles.button}">
                              <span class="${styles.label}">Learn more</span>
                            </a>
                          </div>
                      </div>
                    </div>`;
                },
                (err: any): void => {
                    this.context.statusRenderer.renderError(this.domElement, err);
                }
            );
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
