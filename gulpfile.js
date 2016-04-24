var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssHexRbga = require('postcss-hexrgba');
var postcssImport = require('postcss-import');
var postcssMediaMinmax = require('postcss-media-minmax');
var postcssNested = require('postcss-nested');
var postcssSimpleVars = require('postcss-simple-vars');
var cssmin = require('gulp-cssmin');

var htmlmin = require('gulp-htmlmin');

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('css', function () {
  var processors = [
    autoprefixer({ browsers: '> 5%' }),
    postcssHexRbga,
    postcssImport,
    postcssMediaMinmax,
    postcssNested,
    postcssSimpleVars
  ];

    return gulp.src('src/styles/**/*.css')
        .pipe(postcss(processors))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({ stream: true }));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.css', [ 'css' ]);
    gulp.watch('src/**/*.html', [ 'html' ]);
});

gulp.task('default', [ 'serve', 'fonts', 'css', 'html', 'watch' ]);
