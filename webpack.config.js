const path = require('path')
const process = require("process")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/js/main.tsx',
  mode: "development", //process.env.NODE_ENV || "development",
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html", base: "/" }),
    new FaviconsWebpackPlugin("./src/svg/favicon.svg"),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [ {
					loader: 'svg-react-loader',
				}, {
					loader: 'svgo-loader',
					options: {
						plugins: [
              { removeViewBox: false },
              { addViewBox: {
                type: 'full',
                description: 'Replace width and height with viewBox',
                params: {},
                fn: data => {
                  const svg = data.content[0]

                  if (svg.isElem('svg') && 'width' in svg.attrs && 'height' in svg.attrs && !('viewBox' in svg.attrs)) {
                    svg.addAttr({
                      name: 'viewBox',
                      value: `0 0 ${svg.attr('width').value} ${svg.attr('height').value}`,
                      prefix: '',
                      local: 'class'
                    });
            
                    svg.removeAttr('width');
                    svg.removeAttr('height');
                  }
                  return data
                }
              } },
						],
					},
				} ],
			},
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
        { from: /\/game\/./, to: '/index.html' }

      ]
    },
    proxy: {
      "/api": "http://localhost:1234",
    },
  }
}