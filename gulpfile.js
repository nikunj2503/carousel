var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('css', function(){
  return gulp.src('./css/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./docs/assets/css'))
});

gulp.task('default', ['css']);