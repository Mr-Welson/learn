const inputOptions = {
  // 核心参数
  /**
   * 包文件入口 
   * -i, --input
   * String 唯一必填参数
   */
  input: "src/00_api/main.js",
  /**
   * 外链
   * -e, --external
   * object[] 
   */
  external: [
    'jquery'
  ],
  /**
   * 插件
   * object[] 
   */
  plugins: [],

  // 高级参数
  /**
   * 警告监听
   * Function 可以拦截警告信息并进行相应操作
   */
  onwarn(warning) {
    // 跳过某些警告
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
      return
    };
    // 抛出异常
    if (warning.code === 'NON_EXISTENT_EXPORT') {
      throw new Error(warning.message)
    };
    // 部分警告会有一个 loc 和 frame 属性，可以定位到警告的位置
    if (warning.loc) {
      console.warn(`${warning.loc.file} (${warning.loc.line}:${warning.loc.column}) ${message}`);
      if (warning.frame) {
        console.warn(warning.frame)
      };
    } else {
      // 控制台打印一切警告
      console.warn(warning.message);
    }
  },
  /**
   * 缓存
   * 以前生成的包。使用它来加速后续的构建, Rollup只会重新分析已经更改的模块
   * Object | false 
   */
  // cache,

  // 危险参数
  /**
   * 默认情况下，模块的上下文 - 即顶级的this的值为undefined。在极少数情况下，您可能需要将其更改为其他内容，如 'window'。
   */
  context: undefined,
  /**
   * Object | id => context
   * 同 context, 但是可以定义每个模块的上下文。
   */
  // moduleContext,
  // 兼容 IE8 及一些老版本浏览器，通常不需要
  // legacy
};

module.exports = inputOptions;
