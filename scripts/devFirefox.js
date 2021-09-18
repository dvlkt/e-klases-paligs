const { exec } = require("child_process");
const fs = require("fs");
const { moveSrcToBuild, addManifest } = require("./builder.js");

const build = async () => {
	return new Promise((resolve, reject) => {
		moveSrcToBuild().then(() => {
			addManifest(`firefox`).then(() => {
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
	console.log(`Launching Firefox...`);
	exec("web-ext run --source-dir ./build/");
});