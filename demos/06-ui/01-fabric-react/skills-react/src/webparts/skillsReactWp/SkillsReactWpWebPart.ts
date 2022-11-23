import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SkillsReactWpWebPartStrings';
import SkillsReactWp from './components/SkillsReactWp';
import { ISkillsReactWpProps } from './components/ISkillsReactWpProps';

import { SPHttpClient } from '@microsoft/sp-http';
import { Skill } from './components/skill';

export interface ISkillsReactWpWebPartProps {
    description: string;
}

export default class SkillsReactWpWebPart extends BaseClientSideWebPart<ISkillsReactWpWebPartProps> {
    private _isDarkTheme: boolean = false;
    private _environmentMessage: string = '';

    public render(): void {
        this.getSkillData().then((data) => {
            const element: React.ReactElement<ISkillsReactWpProps> = React.createElement(SkillsReactWp, {
                description: this.properties.description,
                isDarkTheme: this._isDarkTheme,
                environmentMessage: this._environmentMessage,
                hasTeamsContext: !!this.context.sdks.microsoftTeams,
                userDisplayName: this.context.pageContext.user.displayName,
                skills: data,
                context: this.context,
            });
            ReactDom.render(element, this.domElement);
        });
    }

    private getSkillData(): Promise<Skill[]> {
        console.log('url: ', this.context.pageContext.web.absoluteUrl);
        const url: string = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('skills')/items`;
        return this.context.spHttpClient
            .get(url, SPHttpClient.configurations.v1)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json.value;
            }) as Promise<Skill[]>;
    }

    // webpart util methods
    protected onInit(): Promise<void> {
        return this._getEnvironmentMessage().then((message) => {
            this._environmentMessage = message;
        });
    }

    private _getEnvironmentMessage(): Promise<string> {
        if (!!this.context.sdks.microsoftTeams) {
            // running in Teams, office.com or Outlook
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext().then((context) => {
                let environmentMessage: string = '';
                switch (context.app.host.name) {
                    case 'Office': // running in Office
                        environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
                        break;
                    case 'Outlook': // running in Outlook
                        environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
                        break;
                    case 'Teams': // running in Teams
                        environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
                        break;
                    default:
                        throw new Error('Unknown host');
                }

                return environmentMessage;
            });
        }

        return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
    }

    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
        if (!currentTheme) {
            return;
        }

        this._isDarkTheme = !!currentTheme.isInverted;
        const { semanticColors } = currentTheme;

        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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
