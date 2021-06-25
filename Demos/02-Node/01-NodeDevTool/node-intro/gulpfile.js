var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");

var paths = {
  scriptSource: "./src/scripts/*.js",
  scss: "./src/sass/**/*.scss",
  dist: "./dist",
};

// Compile sass

gulp.task("compile-sass", function () {
  return gulp.src(paths.scss).pipe(sass()).pipe(gulp.dest(paths.dist));
});

// Watch sass

gulp.task("watch-sass", function () {
  gulp.watch(paths.scss, ["compile-sass"]);
});

gulp.task("babel", () => {
  return gulp
    .src([paths.scriptSource])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(concat("es5bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist));
});
