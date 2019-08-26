//路径模块
const path = require('path');
//引入html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//处理css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
//压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    //入口
    entry: './src/index.js',
    //loaders
    module: {
        rules: [
            //CSS和less处理
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            // 图片处理
            {
                test: /\.(gif|jpe?g|png)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 小于8kb则将图片转换为base64格式渲染，如果大于8kb，则编译生成一个新的图片到publicPath指定的目录
                            limit: 8192,
                            outputPath: './img',
                            name: '[hash:5].[ext]',
                            publicPath: '../img'
                        }
                    }
                ]
            },
            //字体图标处理
            // {
            //     test: /\.(woff|svg|eot|ttf)\??.*$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[path][name].[ext]',
            //         publicPath: './../dist/'
            //     }
            // },
            //es6转es5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            //压缩html
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: true
                  }
                }],              
            },
            //
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            // minify: {
            //     caseSensitive: false,//是否大小写敏感
            //     collapseWhitespace: true,//是否去除空格
            //     removeComments: true//去注释
            // }
        }),
        new MiniCssExtractPlugin({
            filename: "css/index.css",////都提到build目录下的css目录中
        }),
        new OptimizeCSSAssetsPlugin ({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g, 
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
           
            cssProcessorPluginOptions: {
              preset: [  'default', {
                  discardComments: { removeAll: true}, //对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
              }]
            },
            canPrint: true  // 是否打印编译过程中的日志
          }),
        new CleanWebpackPlugin(),
    ],
    //热模块
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        //compress: true, //采取gzip压缩
        port: 3001,
        open: true
    },
    //出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    }
}