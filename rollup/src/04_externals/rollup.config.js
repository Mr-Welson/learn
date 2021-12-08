import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/04_externals/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    // 将自定义选项传递给解析插件
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    })
  ],
  // 指出应将哪些模块视为外部模块
  external: ['dayjs']
}