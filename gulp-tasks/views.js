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
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const replace = require("gulp-replace");
const yargs = require("yargs");

const argv = yargs.argv,
    production = !!argv.production;

function views() {
    return src(paths.views.src)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(dest(paths.views.dist))
        .pipe(browserSync.stream())
};

module.exports = {
    views
};