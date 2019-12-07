const Timestamp = new Date().getTime();
module.exports = {
   // 输出文件目录
   outputDir: 'PC',
    // eslint-loader 是否在保存的时候检查
   lintOnSave: false, //关闭eslint
    // 生产环境是否生成 sourceMap 文件
   productionSourceMap: false,
   configureWebpack: { // webpack 配置
      output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
         filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
         chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      },
   },
   
}