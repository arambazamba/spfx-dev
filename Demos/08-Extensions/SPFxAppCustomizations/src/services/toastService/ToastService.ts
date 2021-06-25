import { IToast } from './IToast';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export class ToastService {
	//Breaking up the URL like this isn't necessary, but can be easier to update
	private static readonly apiEndPoint: string = "_api/web/lists/getbytitle('Toasts')/items";
	private static readonly select: string = 'Id,Title,Severity,Frequency,Enabled,Message';
	private static readonly orderby: string = 'StartDate asc';

	/** Pulls the active toast entries directly from the underlying list */
	public static getToastsFromList(spHttpClient: SPHttpClient, baseUrl: string): Promise<IToast[]> {
		return spHttpClient
			.get(
				`${baseUrl}/${ToastService.apiEndPoint}?$select=${ToastService.select}&$orderby=${ToastService.orderby}`,
				SPHttpClient.configurations.v1
			)
			.then((response: SPHttpClientResponse): Promise<{ value: IToast[] }> => {
				if (!response.ok) {
					//Failed requests don't automatically throw exceptions which
					// can be problematic for chained promises, so we throw one
					throw `Unable to get items: ${response.status} (${response.statusText})`;
				}
				return response.json();
			})
			.then((results: { value: IToast[] }) => {
				//Clean up extra properties
				// Even when your interface only defines certain properties, SP sends many
				// extra properties that you may or may not care about (we don't)
				// (this isn't strictly necessary but makes the cache much cleaner)
				let toasts: IToast[] = [];
				for (let v of results.value) {
					toasts.push({
						Title: v.Title,
						Id: v.Id,
						Severity: v.Severity,
						Frequency: v.Frequency,
						Enabled: v.Enabled,
						Message: v.Message
					});
				}
				return toasts;
			});
	}
}
