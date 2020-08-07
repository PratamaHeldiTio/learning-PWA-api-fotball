const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/assets/icon.png',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery'
        }),
        new CopyPlugin({
            patterns: [
                { from: './push.js', to: './push.js' },
                { from: './src/assets/', to: './src/assets/' },
            ],
        }),
        new WebpackPwaManifest({
            "filename": "manifest.json",
            "name": "Liga Italia Serie A",
            "short_name": "Serie A",
            "description": "Serie A merupakan liga teratas dalam kasta sepak bola Italia",
            "start_url": "/index.html",
            "display": "standalone",
            "background_color": "#1a237e",
            "theme_color": "#1a237e",
            "icons": [
                {
                    src: path.resolve('./src/assets/icon.png'),
                    size: [72, 96, 128, 144, 192, 256, 284, 512],
                    "purpose": "any maskable"
                }
            ],
            "gcm_sender_id": "215508129416"
        }),
        new InjectManifest({
            swSrc: './sw.js',
            swDest: 'sw.js'
        })

    ]
}

