import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'GraphPersonsWebPartStrings';
import GraphPersons from './components/GraphPersons';
import { IGraphPersonsProps } from './components/IGraphPersonsProps';

export interface IGraphPersonsWebPartProps {
    description: string;
}

export default class GraphPersonsWebPart extends BaseClientSideWebPart<IGraphPersonsWebPartProps> {
    public render(): void {
        this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
            const element: React.ReactElement<IGraphPersonsProps> = React.createElement(GraphPersons, {
                graphClient: client,
            });

            ReactDom.render(element, this.domElement);
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
