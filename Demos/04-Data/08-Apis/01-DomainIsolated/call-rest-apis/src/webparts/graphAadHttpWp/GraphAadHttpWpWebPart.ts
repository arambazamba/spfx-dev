import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'GraphAadHttpWpWebPartStrings';
import GraphAadHttpWp from './components/GraphAadHttpWp';
import { IGraphAadHttpWpProps } from './components/IGraphAadHttpWpProps';
import { IUserItem } from './IUserItem';

export interface IGraphAadHttpWpWebPartProps {
    description: string;
}

export default class GraphAadHttpWpWebPart extends BaseClientSideWebPart<IGraphAadHttpWpWebPartProps> {
    public render(): void {
        this.getUsers().then((users: IUserItem[]) => {
            const element: React.ReactElement<IGraphAadHttpWpProps> = React.createElement(GraphAadHttpWp, {
                userItems: users,
            });

            ReactDom.render(element, this.domElement);
        });
    }

    private getUsers(): Promise<IUserItem[]> {
        return new Promise<IUserItem[]>((resolve, reject) => {
            this.context.aadHttpClientFactory.getClient('https://graph.microsoft.com').then((aadClient: AadHttpClient) => {
                const qry: string = 'https://graph.microsoft.com/v1.0/users?$top=3&$select=id,displayName,mail';
                aadClient
                    .get(qry, AadHttpClient.configurations.v1)
                    .then((response: HttpClientResponse) => {
                        return response.json();
                    })
                    .then((users: any) => {
                        resolve(users.value);
                    });
            });
        });
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
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
