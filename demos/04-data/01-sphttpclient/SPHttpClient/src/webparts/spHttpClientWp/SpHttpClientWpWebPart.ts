import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpHttpClientWpWebPartStrings';
import { SPHttpClient } from '@microsoft/sp-http';
import { ISpHttpClientWpProps } from './components/ISpHttpClientWpProps';
import { ISPList } from './ISPList';
import MockHttpClient from './MockHttpClient';
import SpHttpClientWp from './components/SpHttpClientWp';

export interface ISpHttpClientWpWebPartProps {
    description: string;
}

export default class SpHttpClientWpWebPart extends BaseClientSideWebPart<ISpHttpClientWpWebPartProps> {
    public render(): void {
        this.getListData().then((lists) => {
            const element: React.ReactElement<ISpHttpClientWpProps> = React.createElement(SpHttpClientWp, {
                description: this.properties.description,
                lists: lists,
            });

            ReactDom.render(element, this.domElement);
        });
    }

    private getMockListData(): Promise<ISPList[]> {
        return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then((data: ISPList[]) => {
            return data;
        });
    }

    private getSharePointListData(): Promise<ISPList[]> {
        const url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`;
        return this.context.spHttpClient
            .get(url, SPHttpClient.configurations.v1)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json.value;
            }) as Promise<ISPList[]>;
    }

    private getListData(): Promise<ISPList[]> {
        if (Environment.type === EnvironmentType.Local) {
            return this.getMockListData();
        } else {
            return this.getSharePointListData();
        }
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
