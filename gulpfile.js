var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var OUTPUT_DIR = path.join(__dirname, 'build');

var webpackConfig = {
    entry: [
        path.join(__dirname, 'examples/index.js')
    ],
    output: {
        filename: 'index.js',
        path: OUTPUT_DIR,
        // publicPath: path.join(__dirname, 'build/')
    },
    resolve: {
        root: [
            path.join(__dirname, 'components')
        ]
    },
    externals: [
        {'react': 'var React'}
    ],
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
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    plugins: []
}

gulp.task('assets', function() {
    var assets = [
        'public/**/*',
        'examples/index.html',
        'node_modules/react/dist/react.min.js',
        'node_modules/react/dist/react-dom.min.js'
    ];

    gulp.src(assets)
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['assets'], function(done) {
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

gulp.task('build:watch', ['assets'], function () {
    webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080');
    webpackConfig.entry.unshift('webpack/hot/dev-server');
    webpackConfig.output.publicPath = 'http://localhost:8080/';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        contentBase: OUTPUT_DIR,
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
