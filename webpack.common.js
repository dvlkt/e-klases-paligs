const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        background: path.join(__dirname, "src/background.ts"),
        content: path.join(__dirname, "src/content.ts"),
        popup: path.join(__dirname, "src/popup/index.tsx"),
        options: path.join(__dirname, "src/options/index.tsx")
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insert: "html"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    },
                    "sass-loader"
                ],
            }
        ],
    },
    // Setup @src path resolution for TypeScript files
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@src": path.resolve(__dirname, "src/")
        }
    }
};