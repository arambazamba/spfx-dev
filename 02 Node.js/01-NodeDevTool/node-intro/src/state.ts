import { Util } from "./util";

export class State{
    
    util : Util

    constructor(){
        this.util = new Util();
    }

    init(){        
        console.log("Initializing State")
    }
}