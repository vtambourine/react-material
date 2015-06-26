var gulp = require('gulp');

gulp.task('examples', function () {
    return gulp.src('./examples/pages/*')
        .pipe(function (file) {
            return function () {
                console.log('ahahha');
            }
        })
        .pipe(gulp.dest('./examples/static'))
});

gulp.task('default', ['examples']);
