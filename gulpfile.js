const gulp = require("gulp");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const zip = require("gulp-zip");

const delDistFolder = () => {
    return gulp.src("./dist/", { allowEmpty: true })
        .pipe(clean());
}
const moveChromiumManifest = () => {
    return gulp.src("./src/manifest.chromium.json")
        .pipe(rename("manifest.json"))
        .pipe(gulp.dest("./dist/"));
}
const moveFirefoxManifest = () => {
    return gulp.src("./src/manifest.firefox.json")
        .pipe(rename("manifest.json"))
        .pipe(gulp.dest("./dist/"));
}
const moveHTML = () => {
    return gulp.src(["./src/popup/popup.html", "./src/options/options.html"])
        .pipe(gulp.dest("./dist/"));
}
const moveResources = () => {
    return gulp.src("./src/res/**/*.png")
        .pipe(gulp.dest("./dist/res"));
}
const zipChromium = () => {
    return gulp.src("./dist/**")
        .pipe(zip("chromium.zip"))
        .pipe(gulp.dest("./build/"))
}
const zipFirefox = () => {
    return gulp.src("./dist/**")
        .pipe(zip("firefox.zip"))
        .pipe(gulp.dest("./build/"))
}

exports["build:chromium"] = gulp.series(delDistFolder, moveChromiumManifest, moveHTML, moveResources);
exports["build:firefox"] = gulp.series(delDistFolder, moveFirefoxManifest, moveHTML, moveResources);
exports["package:chromium"] = zipChromium;
exports["package:firefox"] = zipFirefox;