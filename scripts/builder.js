const fs = require("fs");
const ncp = require("ncp");

const getAllJsFiles = (root, exclude) => {
	let fileList = [];

	const files = fs.readdirSync(root, { withFileTypes: true });
	for (file of files) {
		if (!exclude.includes(file.name)) {
			let rootPath = root.split(`/`);
			rootPath.shift();
			rootPath.join(`/`);

			if (file.isDirectory()) {
				fileList = [...fileList, ...getAllJsFiles(`${root}/${file.name}`, exclude)];
			} else {
				if (file.name.split(`.`).pop() === `js`) {
					fileList.push(`${rootPath}/${file.name}`);
				}
			}
		}
	}

	return fileList;
}
const getAllCssFiles = (root, exclude) => {
	let fileList = [];

	const files = fs.readdirSync(root, { withFileTypes: true });
	for (file of files) {
		if (!exclude.includes(file.name)) {
			let rootPath = root.split(`/`);
			rootPath.shift();
			rootPath.join(`/`);

			if (file.isDirectory()) {
				fileList = [...fileList, ...getAllCssFiles(`${root}/${file.name}`, exclude)];
			} else {
				if (file.name.split(`.`).pop() === `css`) {
					fileList.push(`${rootPath}/${file.name}`);
				}
			}
		}
	}

	return fileList;
}

module.exports = {
	moveSrcToBuild: async function() {
		return new Promise((resolve, reject) => {
			if (!fs.existsSync("build")) {
				fs.mkdirSync("build");
			}

			ncp("src", "build", (err) => {
				if (err) {
					//console.log("Error occured while copying files from /src/ to /build/...");
					//console.log(err);
				}
				console.log("Copied files from /src/ to /build/");

				resolve();
			});
		});
	},

	addManifest: async function(platform) {
		return new Promise(async (resolve, reject) => {
			if (!fs.existsSync("build")) {
				fs.mkdirSync("build");
			}
			
			console.log("Generating a Manifest...");

			let manifestData = JSON.parse(fs.readFileSync("src/manifest.json"));

			let jsFiles = getAllJsFiles("src", ["popup"]);
			let cssFiles = getAllCssFiles("src", ["popup"]);

			manifestData["content_scripts"] = [
				{
					"matches": ["*://*.e-klase.lv/*"],
					"js": jsFiles,
					"css": cssFiles,
					"run_at": "document_start"
				}
			];

			switch (platform) {
				case `firefox`:
					manifestData["browser_specific_settings"] = {
						"gecko": {
							"id": "dlektauers@gmail.com"
						}
					};

					break;
				case `chrome`:

					break;
			}

			fs.writeFileSync("build/manifest.json", JSON.stringify(manifestData));

			resolve();
		});
	}
};