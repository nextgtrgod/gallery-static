const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
		// app: './src/app.jsx',
        main: './src/main.jsx',
        // mobile: './src/mobile.js'
	},

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader/webpack',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'], // 'babili'
                            plugins: [
                                ['transform-class-properties', { 'spec': true }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
				use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [
                                ['transform-class-properties', { 'spec': true }]
                            ]
                        }
                    }
                ]
            },
            {
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?url=false',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: () => [
                                        require('autoprefixer')('last 2 versions'),
                                        require('postcss-easing-gradients')
                                    ]
                                }
                            },
                            'stylus-loader'
                        ]
                    }
                )
			}
        ]
    },
    
   plugins: [
        new ExtractTextPlugin('[name].css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: true,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true
        //     },
        //     output: {
        //         comments: false
        //     }
        // }),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin()
    ],

    devServer: {
        historyApiFallback: true,
		inline: true,
		contentBase: './public',
		port: 6060,
        host: '0.0.0.0',
        // proxy: {
        //     '/api': 'http://localhost:9090/',
        //     '/admin': 'http://localhost:9090/admin'
        // }
    },

    // devtool: 'cheap-eval-source-map',
    devtool: 'cheap-module-source-map',
    
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    }
};