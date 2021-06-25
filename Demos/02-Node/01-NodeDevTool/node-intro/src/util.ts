import axios from "axios";

export class Util {
  log() {
    console.log("hello word logged from Util");
  }

  async getFood(url: string) {
    return fetch(url).then((resp) => resp.json());
  }

  async getFoodAxios(url: string) {
    return axios.get(url);
  }
}
