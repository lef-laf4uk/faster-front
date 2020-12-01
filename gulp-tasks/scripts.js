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
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const rename = require("gulp-rename");
const yargs = require("yargs");

const webpackConfig = require("../webpack.config"),
    argv = yargs.argv,
    production = !!argv.production;

webpackConfig.mode = production ? "production" : "development";
webpackConfig.devtool = production ? false : "source-map";

function scripts() {
    return src(paths.scripts.src)
        .pipe(webpackStream(webpackConfig), webpack).on("error", function handleError() {
            this.emit("end")
        })
        .pipe(gulpif(production, rename({
            suffix: ".min"
        })))
        .pipe(dest(paths.scripts.dist))
        .pipe(browserSync.stream())
};

module.exports = {
    scripts
};