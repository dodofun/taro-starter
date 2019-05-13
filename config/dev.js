/* eslint-disable */
module.exports = {
  //环境变量
  env: {
    NODE_ENV: '"development"'
  },
  // 全局变量
  defineConstants: {
    HOST: '"https://dodo.com"'
  },
  weapp: {},
  h5: {
    devServer: {
      port: 7200,
      https: true
    }
  }
}
