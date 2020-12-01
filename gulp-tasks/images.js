"use strict";

import {
    paths
} from "../gulpfile.babel";

const {
    src,
    dest
} = require("gulp");

const browserSync = require("browser-sync").create();
const gulpif = require("gulp-if");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const yargs = require("yargs");

const argv = yargs.argv,
    production = !!argv.production;

function images() {
    return src(paths.images.src)
        .pipe(newer(paths.images.dist))
        .pipe(gulpif(production, imagemin()))
        .pipe(dest(paths.images.dist))
        .pipe(browserSync.stream())
};

module.exports = {
    images
};