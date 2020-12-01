"use strict";

const del = require('del');

function clean() {
    return del("./dist/*", {
        force: true
    })
};

module.exports = {
    clean
};