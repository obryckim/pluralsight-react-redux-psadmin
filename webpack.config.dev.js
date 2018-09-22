import webpack from 'webpack';
import path from 'path';

export default {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill', // for hot reloading with IE
		'webpack-hot-middleware/client?reload=true', // reloads the page if hot module reloading fails
		'./src/index'
	],
	target: 'web',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'main.js'
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true,
			noInfo: false
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
		rules: [
			{ test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader'] },
			{ test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
			{ test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
		]
	}
};
