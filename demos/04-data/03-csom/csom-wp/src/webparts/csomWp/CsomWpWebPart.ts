import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CsomWpWebPartStrings';
import CsomWp from './components/CsomWp';
import { ICsomWpProps } from './components/ICsomWpProps';

require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');

export interface ICsomWpWebPartProps {
    description: string;
}

export default class CsomWpWebPart extends BaseClientSideWebPart<ICsomWpWebPartProps> {
    public render(): void {
        const element: React.ReactElement<ICsomWpProps> = React.createElement(CsomWp, {
            description: this.properties.description,
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
