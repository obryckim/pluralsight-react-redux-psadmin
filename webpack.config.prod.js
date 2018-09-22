import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	mode: 'production',
	devtool: 'source-map',
	target: 'web',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true,
			noInfo: false
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].bundle.css'
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.prod.html'
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: {
			chunks: 'all',
			//   cacheGroups: {
			//     styles: {
			//       name: 'styles',
			//       test: /\.css$/,
			//       chunks: 'all',
			//       enforce: true
			// 		},
			// 		commons: {
			//       name: 'vendors',
			//       test: /[\\/]node_modules[\\/]/,
			// 			chunks: 'all',
			// 			enforce: true
			//     }
			//   }
		}
	},
	module: {
		rules: [
			{ test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader'] },
			{ test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
			{ test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
		]
	}
};
