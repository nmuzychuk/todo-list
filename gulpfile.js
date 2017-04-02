var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['nodemon']);

gulp.task('nodemon', function () {
    nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' }
    });
});
