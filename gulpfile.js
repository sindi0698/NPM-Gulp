const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const watch = require("gulp-watch");

FILEPATHS = {
  image: "./src/img/**/*.+(png|jpg|gif|svg)",
  htmlSrcPage: "./src/html/**/*.html",
  jsSrcPage: "./src/js/**/*.js",
  htmlMainPage: "./*.html",
  buildfolder: "./build",
  buildfolderJs: "./build/js",
  cssSrc: "./src/styles/**/*.css",
  buildCss: "./build/styles",
};
gulp.task("copy", function (done) {
  return gulp
    .src([FILEPATHS.image, FILEPATHS.htmlSrcPage, FILEPATHS.htmlMainPage])
    .pipe(gulp.dest(FILEPATHS.buildfolder));
  done();
});
gulp.task("buildAndServe", function (done) {
  browserSync.init({
    server: {
      baseDir: "./build",
    },
  });
  done();
});
gulp.task("processJs", function (done) {
  gulp
    .src(FILEPATHS.jsSrcPage)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(FILEPATHS.buildfolderJs));
  done();
});
function processCss() {
  return gulp
    .src(FILEPATHS.cssSrc)
    .pipe(cleanCss())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(FILEPATHS.buildCss));
}
gulp.task("processCss", processCss);
gulp.task("watch", function (done) {
  gulp.watch(FILEPATHS.cssSrc, processCss);
  done();
});
