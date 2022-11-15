import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { setup as pnpSetup } from '@pnp/common';

import * as strings from 'ReduxWpWebPartStrings';
import ReduxWp from './components/ReduxWp';
import { IReduxWpProps } from './components/IReduxWpProps';

export interface IReduxWpWebPartProps {
    description: string;
}

export default class ReduxWpWebPart extends BaseClientSideWebPart<IReduxWpWebPartProps> {
    protected onInit(): Promise<void> {
        return super.onInit().then((_) => {
            pnpSetup({
                spfxContext: this.context,
            });
        });
    }

    public render(): void {
        const element: React.ReactElement<IReduxWpProps> = React.createElement(ReduxWp, {
            description: this.properties.description,
            context: this.context,
            siteUrl: this.context.pageContext.web.absoluteUrl,
        });

        ReactDom.render(element, this.domElement);
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
