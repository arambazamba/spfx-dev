"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
const spsync = require("gulp-spsync-creds").sync;

const production = {
  username: "alexander.pajer@integrations.at",
  password: "pwd",
  tenant: "integrationsonline",
  cdnSite: "https://integrationsonline.sharepoint.com/dev",
  cdnLib: "SPFxBuilds",
  catalogSite:
    "https://integrationsonline.sharepoint.com/sites/apps/AppCatalog/"
};

const test = {
  username: "alexander.pajer@integrations.at",
  password: "pwd",
  tenant: "integrationsonline",
  cdnSite: "https://integrationsonline.sharepoint.com/dev/",
  cdnLib: "SPFxBuilds",
  catalogSite:
    "https://integrationsonline.sharepoint.com/sites/apps/AppCatalog/"
};

build.task("upload-bundle", {
  execute: config => {
    return new Promise((resolve, reject) => {
      const deployFolder = require("./config/copy-assets.json");
      const folderLocation = `./${deployFolder.deployCdnPath}/**/*.js`;

      return gulp
        .src(folderLocation)
        .pipe(
          spsync({
            username: config.production ? production.username : test.username,
            password: config.production ? production.password : test.password,
            site: `https://${
              config.production ? production.tenant : test.tenant
            }.sharepoint.com/${
              config.production ? production.cdnSite : test.cdnSite
            }`,
            libraryPath: config.production ? production.cdnLib : test.cdnLib,
            publish: true
          })
        )
        .on("finish", resolve);
    });
  }
});

build.task("upload-app", {
  execute: config => {
    return new Promise((resolve, reject) => {
      // const pkgFile = require("./config/package-solution.json");
      // const folderLocation = `./sharepoint/${pkgFile.paths.zippedPackage}`;
      const folderLocation = `./sharepoint/solution/gulp-task.sppkg`;

      return gulp
        .src(folderLocation)
        .pipe(
          spsync({
            username: config.production ? production.username : test.username,
            password: config.production ? production.password : test.password,
            site: `https://${
              config.production ? production.tenant : test.tenant
            }.sharepoint.com/${
              config.production ? production.catalogSite : test.catalogSite
            }`,
            libraryPath: "AppCatalog",
            publish: true
          })
        )
        .on("finish", resolve);
    });
  }
});

gulp.task("default", ["upload-app"]);

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);
build.initialize(gulp);
