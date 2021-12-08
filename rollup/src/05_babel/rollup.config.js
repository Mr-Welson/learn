import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/05_babel/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    // 将自定义选项传递给解析插件
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ],
  // 指出应将哪些模块视为外部模块
  external: ['dayjs']
}