const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const miniSVGDataURI = require("mini-svg-data-uri");

module.exports = (env, argv) => {
  // TODO: webpack merge
  const isProduction = argv.mode === 'production';
  return {
    devtool: isProduction ? 'eval-cheap-module-source-map' : 'nosources-source-map',
    entry: path.join(__dirname, 'main.js'),
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      assetModuleFilename: "assets/[name]_[hash][ext]"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader', 
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            }
          ],
          sideEffects: true
        },
        // https://webpack.js.org/guides/asset-modules/
        // https://juejin.cn/post/6994049958080938014
        {
          test: /\.(jpe?g|png|gif)$/i,
          type: "asset",
          generator: {
            filename: "images/[name]_[hash][ext]"
          },
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024 // 8kb （低于8kb都会压缩成 base64）
            }
          },
        },
        {
          test: /\.svg$/i,
          type: "asset/inline",
          generator: {
            dataUrl(content) {
              content = content.toString();
              return miniSVGDataURI(content);
            },
          },
          parser: {
            dataUrlCondition: {
              maxSize: 2 * 1024 // 2kb （低于2kb都会压缩）
            }
          },
        },
        {
          test: /\.(otf|eot|woff2?|ttf|svg)$/i,
          type: "asset",
          generator: {
            filename: "fonts/[name]_[hash][ext]",
          },
        },
        {
          test: /\.(txt|xml)$/i,
          type: "asset/source",
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
      }),
      // new BundleAnalyzerPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      usedExports: true
    }
  }
};
