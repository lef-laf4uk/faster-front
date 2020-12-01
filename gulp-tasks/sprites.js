"use strict";

import {
    paths
} from "../gulpfile.babel";

const {
    src,
    dest
} = require("gulp");

const browserSync = require("browser-sync").create();
const svg = require("gulp-svg-sprite");

function sprites() {
    return src(paths.sprites.src)
        .pipe(svg({
            shape: {
                dest: "intermediate-svg"
            },
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest(paths.sprites.dist))
        .pipe(browserSync.stream())
};

module.exports = {
    sprites
};