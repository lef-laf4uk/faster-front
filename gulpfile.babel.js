"use strict";

const { serve } = require("./gulp-tasks/serve");
const { views } = require("./gulp-tasks/views");
const { styles } = require("./gulp-tasks/styles");
const { scripts } = require("./gulp-tasks/scripts");
const { images } = require("./gulp-tasks/images");
const { sprites } = require("./gulp-tasks/sprites");
const { fonts } = require("./gulp-tasks/fonts");
const { clean } = require("./gulp-tasks/clean");

const {
    parallel,
    series,
    watch
} = require("gulp");

const requireDir = require("require-dir");
const browserSync = require("browser-sync").create();

const paths = {
    views: {
        src: [
            "./app/views/*.pug",
            "./app/views/pages/*.pug"
        ],
        dist: "./dist/",
        watch: [
            "./app/blocks/**/*.pug",
            "./app/views/**/*.pug"
        ]
    },
    styles: {
        src: "./app/styles/main.scss",
        dist: "./dist/styles/",
        watch: [
            "./app/blocks/**/*.scss",
            "./app/styles/**/*.scss"
        ]
    },
    scripts: {
        src: "./app/js/app.js",
        dist: "./dist/js/",
        watch: [
            "./app/blocks/**/*.js",
            "./app/js/**/*.js"
        ]
    },
    images: {
        src: [
            "./app/img/**/*.{jpg,jpeg,png,gif,tiff,webp,svg}"
        ],
        dist: "./app/img/",
        watch: "./app/img/**/*.{jpg,jpeg,png,gif,tiff,webp,svg}"
    },
    sprites: {
        src: "./app/img/svg/*.svg",
        dist: "./dest/img/sprites/",
        watch: "./app/img/svg/*.svg"
    },
    fonts: {
        src: "./app/fonts/**/*.woff2",
        dist: "./dist/fonts/",
        watch: "./app/fonts/**/*.woff2"
    }
};

requireDir("./gulp-tasks/");

export { paths };

function watching() {
    watch(paths.views.watch, {usePolling: true }, parallel(views));
    watch(paths.styles.watch, { usePolling: true }, parallel(styles));
    watch(paths.scripts.watch, { usePolling: true }, parallel(scripts));
    watch(paths.images.watch, { usePolling: true }, parallel(images));
    watch(paths.sprites.watch, { usePolling: true }, parallel(sprites));
    watch(paths.fonts.watch, { usePolling: true }, parallel(fonts));
};
export const development = series(clean,
    parallel(views, styles, scripts, images, sprites, fonts),
    parallel(serve, watching));

export const prod = series(clean,
    parallel(views, styles, scripts, images, sprites, fonts));

export default development;
