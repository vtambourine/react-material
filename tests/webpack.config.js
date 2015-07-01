module.exports = {
    entry: {
        'b': [
            'webpack-dev-server/client?http://localhost:8080',
             './a.js',
            './b.js',
         ]
    },
    output: {
        library: 'Hoo',
        libraryTarget: 'var',
        filename: '[name].js',
        path: './build'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }
        ]
    }
}
