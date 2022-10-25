import axios from 'axios';
import { ClassesDemos } from './classes';
import { FunctionDemos } from './functions';
import { GenericsDemos } from './generics';
import { InterfacesDemos } from './interfaces';
import { ModulesDemos } from './modules';
import { ObjectDemos } from './objects';
import { ServicesDemos } from './services';
import { TypesDemos } from './types';

//export method to global namespace - otherwise is is not available for function call

(<any>window).loadIt = loadContent;

export function loadContent(page) {
    let path = './src/' + page;
    axios
        .get(path)
        .then((resp) => {
            if (resp != null) {
                let workbench = document.querySelector('#workbench');
                if (workbench) {
                    workbench.innerHTML = `<div id='heading'><h3></h3><br/>Source: ${page}</div>${resp.data}`;
                }
            }
        })
        .catch((msg) => {
            console.log(msg.responseText);
        });
}

//Exposing Class to GlobalNamespace
export class Loader {
    load(page) {
        let path = './src/' + page;
        axios
            .get(path)
            .then((resp) => {
                if (resp != null) {
                    let workbench = document.querySelector('#workbench');
                    if (workbench) {
                        workbench.innerHTML = `<div id='heading'><h3></h3><br/>Open F12 Dev Tools Console - Source: ${page}</div>${resp.data}`;
                    }
                }
            })
            .catch((msg) => {
                console.log(msg.responseText);
            });
    }
}

//exporting an object
(<any>window).loader = new Loader();

//Using export from webpack.config.js
class Demos {
    types = new TypesDemos();
    classes = new ClassesDemos();
    functions = new FunctionDemos();
    interfaces = new InterfacesDemos();
    generics = new GenericsDemos();
    objects = new ObjectDemos();
    services = new ServicesDemos();
    modules = new ModulesDemos();
}

export var demo = new Demos();
