const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3001,
    client: {
      logging: 'warn',
      overlay: false,
      progress: true,
    },
  },
  output: {
    publicPath: 'http://localhost:3001/',
    uniqueName: 'app2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please vis it https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntryApp2.js',
      exposes: {
        './App2': './src/AppWrapper.tsx',
      },
      remotes: {
        app: 'app@http://localhost:3000/remoteEntry.js',
      },
      shared: [
        {
          lodash: { singleton: true, eager: true },
          react: { singleton: true, eager: true },
          'react-dom': {
            singleton: true,
            eager: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.react.js',
      '.scss',
      '.less',
    ],
  },
};
