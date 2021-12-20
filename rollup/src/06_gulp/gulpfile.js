const gulp = require('gulp');
const rollup = require('rollup');

gulp.task('build', async function () {
  const bundle = await rollup.rollup({
    input: './main.js',
  });

  return await bundle.write({
    file: 'bundle.js',
    format: 'umd',
    name: 'library'
  });
});
