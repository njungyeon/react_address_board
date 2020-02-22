var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer:{
        hot:true,
        inline:true,
        host:'0.0.0.0',
        port:8000,
        contentBase: __dirname + '/public/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                // loaders: ['babel-loader?' + JSON.stringify({
                //     cacheDirectory:true,
                //     presets: ['es2015', 'react']
                // })],
                // exclude: /node_modules/,
                use: [
					{	// Babel 로더 이용
						loader: 'babel-loader',
						options: { // Babel 옵션 지정
							presets: [
								// 'env'로 지정하여 ES2017를 ES5로 변환
								//  modules: false 로 하지않으면 import문이 Babel에 의해서 CommonJS로 변환됨
                                'es2015',
								// React의 JSX 해석
								'react',
								
							],
							cacheDirectory: true,
							plugins : ['react-hot-loader/babel'],
						}
					}
                ],
				exclude: /node_modules/,
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
};