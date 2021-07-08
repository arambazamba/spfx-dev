import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IReduxWpProps {
    description: string;
    context: WebPartContext;
    siteUrl?: string;
    Urlvalue?: string;
}
