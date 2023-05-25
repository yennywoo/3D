const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
    },
    resolve: {
        extensions: [".obj",".mtl","..."]
    },
    devServer: {
        static: './dist',
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },{
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                },
            },{
                test: /\.obj$/,
                use: [{
                    loader: "file-loader"
                }]
            },{
                test: /\.mtl$/,
                use: [{
                    loader: "file-loader"
                }]
            }, 
        ],
    },
};