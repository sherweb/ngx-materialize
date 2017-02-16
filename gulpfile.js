const gulp = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('default', function () {
  return gulp.src(['./src/app/**/*.ts', '!./src/app/**/*.spec.ts'])
    .pipe(inlineNg2Template({
      base: '/src/app',
      useRelativePaths: true,
    }))
    .pipe(gulp.dest('./inline-template'))
});
