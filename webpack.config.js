const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    context: __dirname, // to automatically find tsconfig.json
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.join(__dirname, "src"),
                loader: "ts-loader"
            }
        ]
    },
    devServer: {
        contentBase: "./dist"
    }
};