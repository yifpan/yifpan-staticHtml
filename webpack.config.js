
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin =require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode:'development',
  entry: {
    home:'./src/js/index.js',
    about:'./src/js/about.js',
    articel:'./src/js/articel.js',
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].js'
  },
  optimization:{  //commonChunkPlungins 
    splitChunks:{  //分割代码块
      cacheGroups:{  //缓存组
        common:{  //公共的模块 
            chunks:'initial',// initial表示提取入口文件的公共css及js部分
            minSize:0,   //公用的文件超过0kb就打包
            minChunks:2,  //公用的文件超过2个地方就打包
            name:'common'
        },
      //   vendor:{ //打包第三方模块
      //     priority:1, //优先级为1,
      //     test:/node_modules/, //单独抽出来
      //     chunks:'initial',
      //     minSize:0,
      //     minChunks:2
      //  }
     }
    },
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ["home","common"],
      minify: {
        collapseWhitespace: true,//删除空格、换行
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about.html',
      chunks: ["about","common"],
      minify: {
        collapseWhitespace: true,//删除空格、换行
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/articel.html',
      filename: 'articel.html',
      chunks: ["articel","common"],
      minify: {
        collapseWhitespace: true,//删除空格、换行
      },
    }),
    new MiniCssExtractPlugin({
      // 分离文件路径
      filename: 'css/[name].[chunkhash].css',
    }),
    new OptimizeCSSAssetsPlugin({  //分离css
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      // cssProcessorOptions: cssnanoOptions,
      cssProcessorPluginOptions: {
					preset: ['default', {
				        discardComments: {
				            removeAll: true,
				        },
				        normalizeUnicode: false
				    }]
				 },
        canPrint: true
    }),
    new CopyPlugin([
      {
          from: __dirname+'/src/bitbug_favicon.ico',
          to: __dirname+'/dist/bitbug_favicon.ico',
          ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [ // 定义css规则
        {
            test: /\.less$/, 
            use: [
              {
                loader:MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
              },
              'css-loader',
              'postcss-loader',
              'less-loader'
            ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'images/[name].[hash:7].[ext]',
                  esModule:false
                },
              },
          ]
      },
      { test:/\.js$/,
        use:[
          {
            loader: 'babel-loader',
            options: { 
              presets: [  //大插件集合，还需要配置小插件，在plugin里
                '@babel/preset-env'
              ],
            }
          },
        ],
      },
      {
        test: /\.(html|xml)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },
  devServer:{ //开发服务器配置
    port:8080,
    progress:true,
    contentBase:'./dist', //指向静态服务
    compress:true //打开压缩
  }
}
