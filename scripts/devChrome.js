const { exec } = require("child_process");
const fs = require("fs");
const { moveSrcToBuild, addManifest } = require("./builder.js");

const build = async () => {
    return new Promise((resolve, reject) => {
        moveSrcToBuild().then(() => {
            addManifest(`chrome`).then(() => {
                console.log(`Finished building the extension!`);
                resolve();
            });
        });
    });
}

fs.watch("./src", () => {
    console.log(`Detected changes, rebuilding...`);
    build();
});

build().then(() => {
    console.log(`Launching Chrome...`);
    exec("web-ext run --source-dir ./build/");
});