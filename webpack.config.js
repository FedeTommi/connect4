const path = require("path")
const process = require("process")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
	entry: "./src/js/main.tsx",
	mode: "development", //process.env.NODE_ENV || "development",
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({ template: "./index.html", base: "/" }),
		new FaviconsWebpackPlugin("./src/svg/favicon.svg"),
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "svg-react-loader",
					},
					{
						loader: "svgo-loader",
						options: {
							configFile: path.join(__dirname, "svgo.config.js"),
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
	},
	devServer: {
		// contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		historyApiFallback: {
			rewrites: [
				{ from: /./, to: "/index.html" },
				{ from: /\/game\/./, to: "/index.html" },
			],
		},
		proxy: {
			"/api": "http://localhost:1234",
		},
	},
}
