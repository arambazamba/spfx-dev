import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneDropdown, IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './RestCrudWpWebPart.module.scss';

import * as strings from 'RestCrudWpWebPartStrings';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import { ListItem } from './ListItem';

export interface IRestCrudWpWebPartProps {
    description: string;
    listName: string;
}

export default class RestCrudWpWebPart extends BaseClientSideWebPart<IRestCrudWpWebPartProps> {
    private listOptions: IPropertyPaneDropdownOption[];

    private listItemEntityTypeFullName: string;

    protected onInit(): Promise<void> {
        return this.getLists().then((lists) => {
            this.listOptions = lists.map((list) => {
                return {
                    key: list.Id,
                    text: list.Title,
                };
            });
        });
    }

    private getLists(): Promise<any> {
        if (Environment.type !== EnvironmentType.Local) {
            const url: string = this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`;
            return this.context.spHttpClient
                .get(url, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((json) => {
                    return json.value;
                });
        }
    }

    public render(): void {
        this.domElement.innerHTML = `
          <div class="${styles.restCrudWp}">
            <div class="${styles.container}">
              <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
                <p class="ms-font-l">There are <span id="spanItemLength"></span> item(s) in <span id="spanItemName">${this.properties.listName}</span> list</p>
                <table>
                  <thead id="theader" style="display:none">
                    <tr>
                      <th class="ms-font-xl">Title</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody id="tbodyItems">
                  </tbody>
                </table>
            </div>
            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
              <button class="${styles.button}">
                <label class="${styles.label}">Add New Item</label>
              </button>
            </div>
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-font-l" id="message"></div>
          </div>
            </div>
          </div>`;

        this.generateListItemsHtml();
        this.domElement.getElementsByTagName('button')[0].addEventListener('click', () => {
            this.addNewListItem();
        });
    }

    private generateListItemsHtml(): void {
        const rootContainer: Element = this.domElement.querySelector('#tbodyItems');

        this.getListItems().then((data: ListItem[]) => {
            const count: number = data.length;
            document.getElementById('spanItemLength').innerText = count.toString();
            document.getElementById('theader').style.display = count === 0 ? 'none' : '';

            for (let i: number = 0; i < count; i++) {
                const Id: number = data[i].Id,
                    Title: string = data[i].Title;
                rootContainer.insertAdjacentHTML(
                    'beforeend',
                    `<tr data-id="${Id}">
                        <td><input class="ms-TextField-field" value="${Title}"></input></td>
                        <td>
                          <button class="${styles.button}">
                            <label class="${styles.label}">Update</label>
                          </button>
                        </td>
                        <td>
                          <button class="${styles.button}">
                            <label class="${styles.label}">Delete</label>
                          </button>
                        </td>
                      </tr>`
                );

                const buttons = rootContainer.querySelectorAll(`tr[data-id='${Id}'] button`);

                buttons[0].addEventListener('click', (evt: Event): void => {
                    const trNode: Element = this.getTrAncestor(evt.target);
                    this.saveListItem(trNode, trNode.attributes['data-id'].value);
                    evt.preventDefault();
                });

                buttons[1].addEventListener('click', (evt: Event): void => {
                    const trNode: Element = this.getTrAncestor(evt.target);
                    this.removeListItem(trNode, trNode.attributes['data-id'].value);
                    evt.preventDefault();
                });
            }
        });
    }

    private getListItemEntityTypeFullName(): Promise<string> {
        if (this.listItemEntityTypeFullName) {
            return Promise.resolve(this.listItemEntityTypeFullName);
        }

        return this.context.spHttpClient
            .get(this.context.pageContext['web']['absoluteUrl'] + `/_api/web/lists/GetByTitle('${this.properties.listName}')`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
            .then((value) => {
                this.listItemEntityTypeFullName = value['ListItemEntityTypeFullName'];
                return this.listItemEntityTypeFullName;
            });
    }

    private addNewListItem(): void {
        const rootContainer: Element = this.domElement.querySelector('#tbodyItems');
        rootContainer['insertAdjacentHTML'](
            'beforeend',
            `<tr data-id="0">
              <td>
                <input class='ms-TextField-field' value=""></input>
              </td>
              <td>
                <button class="${styles.button}">
                  <label class="${styles.label}">Add</label>
                </button>
              </td>
              <td>
                <button class="${styles.button}">
                  <label class="${styles.label}">Cancel</label>
                </button>
              </td>
            </tr>`
        );

        const buttons = rootContainer.querySelectorAll('tr')[rootContainer.querySelectorAll('tr').length - 1].querySelectorAll('button');

        buttons[0].addEventListener('click', (evt: Event): void => {
            const el: Element = null;

            const trNode: Element = this.getTrAncestor(evt.target);
            this.saveListItem(trNode, trNode.attributes['data-id'].value);
            evt.preventDefault();
        });

        buttons[1].addEventListener('click', (evt: Event): void => {
            const trNode: Element = this.getTrAncestor(evt.target);
            this.removeListItem(trNode, trNode.attributes['data-id'].value);
            evt.preventDefault();
        });
    }

    private getListItems(): Promise<ListItem[]> {
        return this.context.spHttpClient
            .get(
                this.context.pageContext['web']['absoluteUrl'] + `/_api/web/lists/GetByTitle('${this.properties.listName}')/items?$select=Id,Title`,
                SPHttpClient.configurations.v1
            )
            .then((response: SPHttpClientResponse): Promise<any> => {
                return response.json();
            })
            .then(
                (data: any): ListItem[] => {
                    this.showSuccess(`Successfully loaded ${data.value.length} items`);
                    return data.value;
                },
                (error: any): void => {
                    this.showError(`Loading all items failed with error: ${error}`);
                }
            ) as Promise<ListItem[]>;
    }

    private saveListItem(ContainerNode: Element, Id: string): void {
        this.clearMessage();

        const title = ContainerNode.querySelector('input').value;

        if (title.trim().length === 0) {
            this.showError('Title is required');
            return;
        }

        this.getListItemEntityTypeFullName().then((listItemEntityTypeFullName: string) => {
            const reqJSON: any = {
                '@odata.type': listItemEntityTypeFullName,
                Title: title,
            };

            if (Id === '0') {
                //create a new item
                this.context.spHttpClient
                    .post(
                        this.context.pageContext['web']['absoluteUrl'] + `/_api/web/lists/GetByTitle('${this.properties.listName}')/items`,
                        SPHttpClient.configurations.v1,
                        {
                            body: JSON.stringify(reqJSON),
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                            },
                        }
                    )
                    .then((response: SPHttpClientResponse): Promise<ListItem> => {
                        return response.json();
                    })
                    .then(
                        (item: ListItem): void => {
                            ContainerNode.querySelectorAll('button')[0].textContent = 'Update';
                            ContainerNode.querySelectorAll('button')[0].parentElement.parentElement.setAttribute('data-id', item.Id.toString());
                            this.showSuccess(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);
                            this.updateItemCount(1);
                        },
                        (error: any): void => {
                            this.showError('Error while creating the item: ${error}');
                        }
                    );
            } else {
                //update a list item
                this.context.spHttpClient
                    .post(
                        this.context.pageContext['web']['absoluteUrl'] + `/_api/web/lists/GetByTitle('${this.properties.listName}')/items(${Id})`,
                        SPHttpClient.configurations.v1,
                        {
                            body: JSON.stringify(reqJSON),
                            headers: {
                                'IF-MATCH': '*',
                                'X-HTTP-Method': 'MERGE',
                                accept: 'application/json',
                                'content-type': 'application/json',
                            },
                        }
                    )
                    .then(
                        (response: SPHttpClientResponse): void => {
                            this.showSuccess(`Item with ID: ${Id} successfully updated`);
                        },
                        (error: any): void => {
                            this.showError(`Error updating item: + ${error}`);
                        }
                    );
            }
        });
    }

    private removeListItem(ContainerNode: Element, Id: string): void {
        this.clearMessage();

        if (Id === '0') {
            ContainerNode.parentNode.removeChild(ContainerNode);
        } else {
            this.context.spHttpClient
                .post(
                    this.context.pageContext['web']['absoluteUrl'] + `/_api/web/lists/GetByTitle('${this.properties.listName}')/items(${Id})`,
                    SPHttpClient.configurations.v1,
                    {
                        headers: {
                            'IF-MATCH': '*',
                            'X-HTTP-Method': 'DELETE',
                            accept: 'application/json',
                            'content-type': 'application/json',
                        },
                    }
                )
                .then(
                    (response: SPHttpClientResponse): void => {
                        ContainerNode.parentNode.removeChild(ContainerNode);
                        this.showSuccess(`Item with ID: ${Id} successfully deleted`);
                        this.updateItemCount(-1);
                    },
                    (error: any): void => {
                        this.showError(`Error deleting item: ${error}`);
                    }
                );
        }
    }

    private updateItemCount(increment: number) {
        const countElement = document.getElementById('spanItemLength');
        const count: number = Number(countElement.innerText);
        countElement.innerText = (count + increment).toString();
    }

    private getTrAncestor(target: EventTarget): Element {
        var element: Element = target as Element;
        while (element && element.tagName.toLowerCase() != 'tr') {
            element = element.parentElement;
        }
        return element;
    }

    private clearMessage() {
        this.domElement.querySelector('#message').innerHTML = '';
    }

    private showSuccess(message: string) {
        const elem: Element = this.domElement.querySelector('#message');
        elem.className = 'ms-fontColor-white';
        elem.innerHTML = message;
    }

    private showError(message: string) {
        const elem: Element = this.domElement.querySelector('#message');
        elem.className = 'ms-fontColor-red';
        elem.innerHTML = message;
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
                                PropertyPaneDropdown('listName', {
                                    label: 'Select a list to work with:',
                                    selectedKey: this.listOptions.length > 0 ? this.listOptions[0].key : null,
                                    options: this.listOptions,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
