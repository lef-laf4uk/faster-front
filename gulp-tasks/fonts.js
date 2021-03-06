"use strict";

import {
    paths
} from "../gulpfile.babel";

const {
    src,
    dest
} = require("gulp");

const browserSync = require("browser-sync").create();

function fonts() {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dist))
        .pipe(browserSync.stream())
};

module.exports = {
    fonts
};