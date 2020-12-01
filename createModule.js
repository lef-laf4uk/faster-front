/* eslint-disable */
"use strict";

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require("fs");
const projectConfig = require("./config.js");

const dir = projectConfig.dir;
const mkdirp = require("mkdirp");

const moduleName = process.argv[2];
const defaultExtensions = ["scss"]; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (moduleName) {
    const dirPath = `${dir.module}${moduleName}/`; // полный путь к создаваемой папке блока
    const dirPathImportScss = `${dir.module}_modules.scss`; // полный путь к _modules.scss
    const dirPathImportPug = `${dir.module}_modules.pug`; // полный путь к _modules.pug
    const dirPathImportJs = `${dir.appendJs}modules.js`; // полный путь к modules.js

    const made = mkdirp.sync(dirPath);
    console.log(`[MODULE] Создание папки: ${made}`);

    // Обходим массив расширений и создаем файлы, если они еще не созданы
    extensions.forEach((extension) => {
        const filePath = `${dirPath + moduleName}.${extension}`; // полный путь к создаваемому файлу
        let fileContent = ""; // будущий контент файла
        let fileCreateMsg = ""; // будущее сообщение в консоли при создании файла
        let importAppendScss = "";
        let importAppendPug = "";
        let importAppendJs = "";

        if (extension === "scss") {
            fileContent = `// В этом файле должны быть стили для БЭМ-блока ${moduleName} //\n\n.${moduleName} {\n\n  &__inner {\n\n  }\n\n}`;
            importAppendScss = `@import "${moduleName}/${moduleName}";\n`;
            // fileCreateMsg = "";
        } else if (extension === "js") {
            fileContent = `/* global document */\n\n// const ready = require("../../../js/utils/documentReady.js");\n\n// ready(function(){\n//   \n// });\n`;
            importAppendJs = `import "%modules%/${moduleName}/${moduleName}";\n`;
        } else if (extension === "pug") {
            fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${moduleName}) //\n\nsection.section.${moduleName}\n  .wrapper\n    .${moduleName}__inner\n`;
            importAppendPug = `include ${moduleName}/${moduleName}\n`;
        }

        if (fileExist(filePath) === false) {
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    return console.log(`[MODULE] Файл НЕ создан: ${err}`);
                }
                console.log(`[MODULE] Файл создан: ${filePath}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportScss, importAppendScss, (err) => {
                if (err) {
                    return console.log(`[MODULE] modules НЕ получил import: ${err}`);
                }
                console.log(`[MODULE] modules получил import: ${dirPathImportScss}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportPug, importAppendPug, (err) => {
                if (err) {
                    return console.log(`[MODULE] modules НЕ получил import: ${err}`);
                }
                console.log(`[MODULE] modules получил import: ${dirPathImportPug}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportJs, importAppendJs, (err) => {
                if (err) {
                    return console.log(`[MODULE] modules НЕ получил import: ${err}`);
                }
                console.log(`[MODULE] modules получил import: ${dirPathImportJs}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
        }

    });
} else {
    console.log("[MODULE] Отмена операции: не указан блок");
}



function uniqueArray(arr) {
    const objectTemp = {};
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        objectTemp[str] = true;
    }
    return Object.keys(objectTemp);
}

function fileExist(path) {
    const fs = require("fs");
    try {
        fs.statSync(path);
    } catch (err) {
        return !(err && err.code === "ENOENT");
    }
}