/* eslint-disable */
"use strict";

// Генератор файлов блока

// Использование: node createBlock.js [имя блока] [доп. расширения через пробел]

const fs = require("fs");
const projectConfig = require("./config.js");

const dir = projectConfig.dir;
const mkdirp = require("mkdirp");

const componentName = process.argv[2];
const defaultExtensions = ["scss"]; // расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (componentName) {
    const dirPath = `${dir.component}${componentName}/`; // полный путь к создаваемой папке блока
    const dirPathImportScss = `${dir.component}_components.scss`; // полный путь к _components.scss
    const dirPathImportPug = `${dir.component}_components.pug`; // полный путь к _components.pug
    const dirPathImportJs = `${dir.appendJs}components.js`; // полный путь к components.js

    const made = mkdirp.sync(dirPath);
    console.log(`[COMPONENT] Создание папки: ${made}`);

    // Обходим массив расширений и создаем файлы, если они еще не созданы
    extensions.forEach((extension) => {
        const filePath = `${dirPath + componentName}.${extension}`; // полный путь к создаваемому файлу
        let fileContent = ""; // будущий контент файла
        let fileCreateMsg = ""; // будущее сообщение в консоли при создании файла
        let importAppendScss = "";
        let importAppendPug = "";
        let importAppendJs = "";

        if (extension === "scss") {
            fileContent = `// В этом файле должны быть стили для БЭМ-блока ${componentName} //\n\n.${componentName} {\n\n  &__ {\n\n  }\n\n}`;
            importAppendScss = `@import "${componentName}/${componentName}";\n`;
            // fileCreateMsg = "";
        } else if (extension === "js") {
            fileContent = `/* global document */\n\n// const ready = require("../../js/utils/documentReady.js");\n\n// ready(function(){\n//   \n// });\n`;
            importAppendJs = `import "%components%/${componentName}/${componentName}";\n`;
        } else if (extension === "pug") {
            fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${componentName})\n\nnmixin ${componentName}(text, mods)\n\n  .${componentName}`;
            importAppendPug = `include ${componentName}/${componentName}\n`;
        }

        if (fileExist(filePath) === false) {
            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    return console.log(`[COMPONENT] Файл НЕ создан: ${err}`);
                }
                console.log(`[COMPONENT] Файл создан: ${filePath}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportScss, importAppendScss, (err) => {
                if (err) {
                    return console.log(`[COMPONENT] components НЕ получил import: ${err}`);
                }
                console.log(`[COMPONENT] components получил import: ${dirPathImportScss}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportPug, importAppendPug, (err) => {
                if (err) {
                    return console.log(`[COMPONENT] components НЕ получил import: ${err}`);
                }
                console.log(`[COMPONENT] components получил import: ${dirPathImportPug}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
            fs.appendFile(dirPathImportJs, importAppendJs, (err) => {
                if (err) {
                    return console.log(`[COMPONENT] components НЕ получил import: ${err}`);
                }
                console.log(`[COMPONENT] components получил import: ${dirPathImportJs}`);
                if (fileCreateMsg) {
                    console.warn(fileCreateMsg);
                }
            });
        }

    });
} else {
    console.log("[COMPONENT] Отмена операции: не указан блок");
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