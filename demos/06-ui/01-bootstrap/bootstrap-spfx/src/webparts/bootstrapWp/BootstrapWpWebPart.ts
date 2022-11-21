import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './BootstrapWpWebPart.module.scss';
import * as strings from 'BootstrapWpWebPartStrings';

export interface IBootstrapWpWebPartProps {
    description: string;
}

export default class BootstrapWpWebPart extends BaseClientSideWebPart<IBootstrapWpWebPartProps> {
    public render(): void {
        let cssURL = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
        SPComponentLoader.loadCss(cssURL);

        this.domElement.innerHTML = `      
            <div id="container">
                <div class="tab-content">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Text</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Paid</th>
                        </tr>
                        </thead>
                        <tbody id="tblBody">
                        </tbody>
                    </table>
                </div>              
            </div>`;

        this.renderVouchers();
    }

    protected renderVouchers(): void {
        let arrVouchers = [
            {
                ID: 1,
                Date: '01.01.2016',
                Amount: 100,
                Text: 'Schreibwaren',
                Paid: false,
            },
            {
                ID: 2,
                Date: '02.01.2016',
                Amount: 56,
                Text: 'Diesel',
                Paid: false,
            },
            {
                ID: 3,
                Date: '02.01.2016',
                Amount: 1267,
                Text: 'Laptop',
                Paid: true,
            },
        ];

        const body = document.getElementById('tblBody');

        if (body) {
            let tbl = '';
            arrVouchers.forEach((item) => {
                tbl += `<tr data-item="${JSON.stringify(item)}" style="cursor:pointer">
                <td>${item.ID}</td>
                <td>${item.Text}</td>
                <td>${item.Date}</td>
                <td>${item.Amount}</td>
                <td>${item.Paid}</td></tr>`;
            });
            body.innerHTML = tbl;
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
