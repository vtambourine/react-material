var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PAGES_DIR = path.join(__dirname, 'examples/pages');

var INDEX_HTML = path.join(__dirname, 'examples/index.html');

var pages = fs.readdirSync(PAGES_DIR).filter(function (file) {
    return fs.statSync(path.join(PAGES_DIR, file)).isDirectory();
});

var entries = pages.reduce(function (result, file) {
    result[file] = [
        'webpack/hot/dev-server',
        path.join(PAGES_DIR, file, 'index.js'),
    ];
    return result;
}, {});

var templatePlugins = pages.map(function (folder) {
    return new HtmlWebpackPlugin({
        filename: folder + '/index.html',
        template: INDEX_HTML,
        chunks: [folder]
    });
});

var webpackConfig = {
    entry: entries,
    output: {
        library: 'Example',
        filename: '[name]/index.js',
        path: path.join(__dirname, 'build/'),
        publicPath: path.join(__dirname, 'build/')
    },

    resolve: {
        root: [path.join(__dirname, 'components')]
    },
    externals: [
        {'react': 'var React'}
    ],
    plugins: templatePlugins,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
}

gulp.task('build', function(done) {
    var compiler = webpack(webpackConfig);
    compiler.run(function (error, stats) {
        if (error) throw new gutil.PluginError('webpack', error);
        gutil.log('[webpack]', stats.toString({
            assets: true,
            chunks: false
        }));
        done();
    });
});

gulp.task('build:server', function () {
    webpackConfig.output.publicPath = 'http://localhost:8080/';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        hot: true,
        quiet: true,
        noInfo: false,
        stats: { colors: true }
    }).listen(8080, 'localhost', function (error) {
        if (error) throw new gutil.PluginError('webpack-dev-server', error);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');
    });
});

gulp.task('clean', function () {
    del('./build');
});

gulp.task('default', ['build']);
