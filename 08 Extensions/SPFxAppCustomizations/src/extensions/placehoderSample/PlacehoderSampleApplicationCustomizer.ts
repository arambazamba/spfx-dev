import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';

import * as strings from 'PlacehoderSampleApplicationCustomizerStrings';
import styles from './Placeholder.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

const LOG_SOURCE: string = 'PlacehoderSampleApplicationCustomizer';

export interface IPlacehoderSampleApplicationCustomizerProperties {
	Top: string;
	Bottom: string;
}

export default class PlacehoderSampleApplicationCustomizer extends BaseApplicationCustomizer<
	IPlacehoderSampleApplicationCustomizerProperties
> {
	private _topPlaceholder: PlaceholderContent | undefined;
	private _bottomPlaceholder: PlaceholderContent | undefined;

	@override
	public onInit(): Promise<void> {
		Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

		this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

		this.renderPlaceHolders();
		return Promise.resolve<void>();
	}

	private renderPlaceHolders(): void {
		console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
		console.log(
			'Available placeholders: ',
			this.context.placeholderProvider.placeholderNames.map((name) => PlaceholderName[name]).join(', ')
		);

		if (!this._topPlaceholder) {
			this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, {
				onDispose: this._onDispose
			});

			if (!this._topPlaceholder) {
				console.error('The expected placeholder (Top) was not found.');
				return;
			}

			if (this.properties) {
				let topString: string = this.properties.Top;
				if (!topString) {
					topString = '(Top property was not defined.)';
				}

				if (this._topPlaceholder.domElement) {
					this._topPlaceholder.domElement.innerHTML = `
                    <div class="${styles.app}">
                      <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
                        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
                      </div>
                    </div>`;
				}
			}
		}

		if (!this._bottomPlaceholder) {
			this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, {
				onDispose: this._onDispose
			});

			if (!this._bottomPlaceholder) {
				console.error('The expected placeholder (Bottom) was not found.');
				return;
			}

			if (this.properties) {
				let bottomString: string = this.properties.Bottom;
				if (!bottomString) {
					bottomString = '(Bottom property was not defined.)';
				}

				if (this._bottomPlaceholder.domElement) {
					this._bottomPlaceholder.domElement.innerHTML = `
                    <div class="${styles.app}">
                      <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.bottom}">
                        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(bottomString)}
                      </div>
                    </div>`;
				}
			}
		}
	}

	private _onDispose(): void {
		console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
	}
}
