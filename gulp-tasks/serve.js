"use strict";

const browserSync = require("browser-sync").create();

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        browser: "chrome",
        notify: false,
        open: false
    });
};

module.exports = {
    serve
};