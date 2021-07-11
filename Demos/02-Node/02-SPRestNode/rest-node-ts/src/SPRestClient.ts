import * as Msal from "msal";
import { MSALConfig } from "../config-model";

export class SPRestClient {
  private msalApp: Msal.UserAgentApplication = null;
  private msalAcct: Msal.Account;
  private baseUrl = "";

  constructor(private msalcfg: MSALConfig) {
    this.msalApp = new Msal.UserAgentApplication(msalcfg);
    this.baseUrl = this.getBaseUrl(msalcfg);
  }

  logInfo() {
    console.log(`SPRestClient - Version 1.0.0 working in Tenant: ${this.msalcfg.spTenant} on Site:  ${this.msalcfg.site} `);
  }

  async logIn() {
    const request = {
      scopes: ["user.read"],
    };
    await this.msalApp
      .loginPopup(request)
      .then((loginResponse) => {
        console.log("id_token acquired at: " + new Date().toString());
        console.log("LoginResponse", loginResponse);

        if (this.msalApp.getAccount()) {
          this.msalAcct = this.msalApp.getAccount();
          console.log("Account", this.msalAcct);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getToken() {
    const spScopeV1 = {
      scopes: [`https://${this.msalcfg.spTenant}.sharepoint.com/.default`],
    };
    return await this.msalApp.acquireTokenSilent(spScopeV1);
  }

  private getBaseUrl(cfg: MSALConfig): string {
    if (this.msalcfg.site) {
      return `https://${cfg.spTenant}.sharepoint.com/sites/${cfg.site}/_api`;
    } else {
      return `https://${cfg.spTenant}.sharepoint.com/_api`;
    }
  }

  async query(qry: string, log = false) {
    const token = await this.getToken();
    const httpResult = await fetch(`${this.baseUrl}/${qry}`, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
        accept: "application/json;odata=verbose",
      },
    });
    const result = await httpResult.json();
    if (log) {
      console.log(`result from ${qry}:`, result.d);
    }
    return result;
  }

  async createItem(listName: string) {
    const qry = `lists/getByTitle('${listName}')/Items`;
    const token = await this.getToken();
    const item = JSON.stringify({
      __metadata: { type: "SP.List" },
      Title: "Task from REST",
    });

    const result = await fetch(`${this.baseUrl}/${qry}`, {
      method: "Post",
      body: item,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        Accept: "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
      },
    });
    console.log("insert result:", result);
    console.log("don't forget to fix id in next samples");
  }

  async createFolder(listName: string) {
    const qry = `lists/getByTitle('${listName}')/Items`;
    const token = await this.getToken();

    const item = JSON.stringify({
      __metadata: { type: "SP.List" },
      Title: "Task from REST",
    });

    const result = await fetch(`${this.baseUrl}/${qry}`, {
      method: "Post",
      body: item,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        Accept: "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
      },
    });
    console.log("insert result:", result);
    console.log("don't forget to fix id in next samples");
  }

  async updateItem(listName: string, id: number, title: string) {
    const qry = `lists/getByTitle('${listName}')/Items(${id})`;
    const token = await this.getToken();

    const item = JSON.stringify({
      __metadata: { type: "SP.List" },
      Title: title,
    });

    const result = await fetch(`${this.baseUrl}/${qry}`, {
      method: "POST",
      body: item,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        Accept: "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "X-HTTP-Method": "MERGE",
        "If-Match": "*",
      },
    });
    console.log("update result:", result);
  }

  async deleteItem(listName: string, id: number) {
    const qry = `lists/getByTitle('${listName}')/Items(${id})`;
    const token = await this.getToken();

    const result = await fetch(`${this.baseUrl}/${qry}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token.accessToken,
        Accept: "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "X-HTTP-Method": "DELETE",
        "If-Match": "*",
      },
    });
    console.log("delete result:", result);
  }
}
