"use strict";

const path = require("path");
const { util } = require("webpack");
const webpack = require('webpack');

var commonConfig = {
    mode: "development",
    entry: {
        noteBooks: "./Scripts/Notes/NoteBooks/root.tsx",
    },
    output: {
        path: path.join(__dirname, "wwwroot", "dist"),
        publicPath: "dist/",
        filename: "[name].js"
    },
    devtool: "inline-source-map",
    resolve: {
        modules: [
            path.resolve("./node_modules")
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.resolve(__dirname, "Scripts")
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}

var utilsConfig = Object.assign({}, commonConfig, {
    entry: {
        plannerCore: "./Scripts/Core/PlannerCore.ts",
    },
    output: {
        path: path.join(__dirname, "wwwroot", "dist"),
        publicPath: "dist/",
        filename: "[name].js",
        libraryTarget: "var",
        library: "plannerCore"
    }
});

module.exports = [commonConfig, utilsConfig];