

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: "production",  //模式
    devtool: 'inline-source-map',  //sourcemap文件
    entry: ['babel-polyfill', './src/index.js'], //入口
    output: {
        filename: 'js/[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {      //配置别名
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {   //压缩文件
        minimizer: [  //自定义压缩方式
            new OptimizeCSSAssetsPlugin({}), //压缩css
            new UglifyJsPlugin({})           //压缩js
        ],
        splitChunks: {
            chunks: 'all',
            name: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MinCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MinCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'media/[name].[ext]',
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new MinCssExtractPlugin({
            filename: "css/[hash].css"
        }),
        new CleanWebpackPlugin(),
        new HtmlPlugin({
            template: './public/index.html',
            inject: true
        })
    ],
    performance: {
        hints: 'warning'
    },
    externals: {
        echarts: "echarts"
    }
}