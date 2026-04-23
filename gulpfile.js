const { src, dest, watch, series, parallel } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

const paths = {
    html: "./*.html",
    css: "./css/*.css",
    js: "./js/*.js",
    images: "./image/**/*",
    serviceWorker: "./sw.js"
};

function htmlTask() {
    return src(paths.html)
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function cssTask() {
    return src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

function jsTask() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
}

function imageTask() {
    return src(paths.images)
        .pipe(imagemin())
        .pipe(dest("dist/image"))
        .pipe(browserSync.stream());
}

function serviceWorkerTask() {
    return src(paths.serviceWorker)
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function serveTask() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    watch(paths.html, htmlTask);
    watch(paths.css, cssTask);
    watch(paths.js, jsTask);
    watch(paths.images, imageTask);
    watch(paths.serviceWorker, serviceWorkerTask);
}

const build = parallel(htmlTask, cssTask, jsTask, imageTask, serviceWorkerTask);

exports.build = build;
exports.default = series(build, serveTask);
