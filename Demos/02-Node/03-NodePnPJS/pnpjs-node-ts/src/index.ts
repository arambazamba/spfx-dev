import { SPFetchClient } from '@pnp/nodejs-commonjs';
import { sp } from '@pnp/sp-commonjs';
import { config } from './pnp-config';

// expose runPnPSamples to global namespace
(<any>window).runPnPSamples = runPnPSamples;

export async function runPnPSamples() {
    sp.setup({
        sp: {
            fetchClientFactory: () => {
                return new SPFetchClient(config.siteUrl, config.clientId, config.clientSecret);
            },
        },
    });

    const w = await sp.web();
    console.log(JSON.stringify(w, null, 2));
}
