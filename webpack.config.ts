const path = require('path');

let mode = 'development';
let target = 'web';
let devtool = 'source-map';

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
    devtool = 'nosources-source-map';
}

module.exports = {
    mode,
    target: 'web',
    entry: './src/web-components/tile-picker',
    output: {
        filename: mode === 'development' ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                type: 'asset'
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    devtool,
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
          publicPath: '/assets',
        },
        watchFiles: {
            paths: path.resolve(__dirname, 'src'),
            options: {
                ignored: /node_modules/
            }
        },
        compress: true,
        hot: true,
    },
    optimization: {
        splitChunks: {
            chunks: mode === 'production' ? 'all' : 'async'
        }
    }
}
