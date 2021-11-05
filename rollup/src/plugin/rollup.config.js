import json from 'rollup-plugin-json'
export default {
  input: 'src/plugin/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [json()]
}