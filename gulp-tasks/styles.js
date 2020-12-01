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
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const mincss = require("gulp-clean-css");
const groupmedia = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const yargs = require("yargs");


const argv = yargs.argv,
    production = !!argv.production;

function styles() {
    return src(paths.styles.src)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(gulpif(production, autoprefixer({
            overrideBrowserslist: ["last 3 versions", "> 1%", "ie 9-11"],
            cascade: false,
            grid: true
        })))
        .pipe(gulpif(production, mincss({
            compatibility: "ie8",
            level: {
                1: {
                    specialComments: 0,
                    removeEpty: true,
                    removeWhitespace: true
                },
                2: {
                    mergeMedia: true,
                    removeEpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false,
                }
            }
        })))
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(plumber.stop())
        .pipe(gulpif(!production, sourcemaps.write("./maps/")))
        .pipe(dest(paths.styles.dist))
        .on("change", browserSync.reload);
};

module.exports = {
    styles
};