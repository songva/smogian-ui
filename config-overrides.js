const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function override(config, env) {
	config.plugins.push(
		new CompressionPlugin({
			filename: '[path][base].gz',
			// algorithm: 'brotliCompress',
			algorithm: 'gzip',
			test: /\.(js|css|html|svg|png)$/,
			// compressionOptions: {
			// 	params: {
			// 		[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
			// 	},
			// },
			threshold: 4096,
			minRatio: 0.8,
			deleteOriginalAssets: true,
		})
	);

	return config;
};
