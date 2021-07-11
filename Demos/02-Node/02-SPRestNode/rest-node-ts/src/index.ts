import { SPRestClient } from "./SPRestClient";

// expose runSampleQueries to global namespace
(<any>window).runSampleQueries = runSampleQueries;

export async function runSampleQueries() {
  const client = await initClient();

  const title = await client.query("/web/title");
  console.log("Title of the web", title);

  const lists = await client.query("/web/lists");
  console.log("Lists of the web", lists);
}

// expose initClient to global namespace
(<any>window).initClient = initClient;

export async function initClient() {
  var cfg = await fetch("msal-config.json").then((response) => response.json());
  const client = new SPRestClient(cfg);
  // expose SPRestClient to global namespace
  (<any>window).sprest = client;
  client.logInfo();
  await client.logIn();
  return client;
}
