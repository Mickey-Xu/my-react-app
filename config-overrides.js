module.exports = {
    webpack: function (config, env) {
        // 这里可以加入自定义 Webpack 配置
        config.resolve.fallback = {
            fs: false,
            canvas: false,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url/'),
            buffer: false,
            zlib:false,

        };

        return config;
    }
};