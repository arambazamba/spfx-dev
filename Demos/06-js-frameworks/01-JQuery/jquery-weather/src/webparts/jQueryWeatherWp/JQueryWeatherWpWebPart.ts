import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as $ from 'jquery';
require('simpleWeather');

import styles from './JQueryWeatherWpWebPart.module.scss';
import * as strings from 'JQueryWeatherWpWebPartStrings';

export interface IJQueryWeatherWpWebPartProps {
    location: string;
}

export default class JQueryWeatherWpWebPart extends BaseClientSideWebPart<IJQueryWeatherWpWebPartProps> {
    private container: JQuery;

    public render(): void {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = `<div class="${styles.weather}"></div>`;
        }
        this.renderContents();
    }

    private renderContents(): void {
        const location: string = escape(this.properties.location);
        this.container = $(`.${styles.weather}`, this.domElement);

        if (!location || location.length === 0) {
            this.container.html('<p>Please specify a location</p>');
            return;
        }

        const webPart: JQueryWeatherWpWebPart = this;

        ($ as any).simpleWeather({
            location: location,
            woeid: '',
            unit: 'c',
            success: (weather: any): void => {
                const html: string = `<h2><i class="icon${weather.code}"></i> ${weather.temp}&deg;${weather.units.temp}</h2>
           <ul><li>${weather.city} ${weather.region}</li></ul>`;

                webPart.container.html(html).removeAttr('style').css('background', `url('http://loremflickr.com/500/139/${location}')`);
            },
            error: (error: any): void => {
                webPart.container.html(`<p>${error.message}</p>`).removeAttr('style');
            },
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
                                PropertyPaneTextField('location', {
                                    label: strings.LocationFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
