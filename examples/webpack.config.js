var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var cwd = process.cwd();

var PAGES_DIR = path.join(__dirname, 'pages');
var INDEX_HTML = path.join(__dirname, 'index.html');

var examplesHtml = []
var exampleEntries = fs.readdirSync(PAGES_DIR).reduce(function (result, file) {
    if (fs.statSync(path.join(PAGES_DIR, file)).isDirectory()) {
        examplesHtml.push(new HtmlWebpackPlugin({
            filename: file + '/index.html',
            template: INDEX_HTML,
            chunks: [file]
        }));

        result[file] = [
            path.join(PAGES_DIR, file, 'index.js'),
            // INDEX_HTML
        ];
    }
    return result;
}, {});

module.exports = {
    devtool: 'eval',

    entry: [
       //'webpack-dev-server/client?http://localhost:3000',
       //'webpack/hot/only-dev-server',
       path.join(cwd, 'examples/index.js')
    ],

    entry: exampleEntries,

    output: {
        path: path.join(__dirname, 'static/'),
        filename: '[name]/index.js',
        publicPath: path.join(__dirname, 'static/')
    },

    resolve: {
        root: [
            path.join(cwd)
        ]
    },
    externals: [
        {
            'react': 'var React'
        }
    ],
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    ].concat(examplesHtml),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                // loaders: ['react-hot', 'babel'],
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};
