# jQuery

Notice lib dependency in config.json:

```json
"externals": {
    "jquery": {
        "path": "node_modules/jquery/dist/jquery.min.js",
        "globalName": "jquery"
    },
    "simpleWeather": {
        "path": "node_modules/simpleweather/jquery.simpleWeather.min.js",
        "globalName": "simpleWeather",
        "globalDependencies": ["jquery"]
    }
},
```