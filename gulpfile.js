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
var postcssExtend = require('postcss-extend');
var cssmin = require('gulp-cssmin');

var htmlmin = require('gulp-htmlmin');
var htmlI18n = require('gulp-html-i18n');

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
    postcssImport,
    postcssSimpleVars,
    postcssHexRbga,
    postcssExtend,
    postcssNested,
    postcssMediaMinmax
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
    .pipe(htmlI18n({
      langDir: 'src/lang'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('robots', function() {
  return gulp.src('src/robots.txt')
    .pipe(gulp.dest('dist'));
});

gulp.task('favicons', function() {
  return gulp.src('src/favicons/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('resumes', function() {
  return gulp.src('src/resumes/**/*')
    .pipe(gulp.dest('dist/download'));
});

gulp.task('watch', function () {
    gulp.watch('src/styles/**/*.css', [ 'css' ]);
    gulp.watch('src/**/*.html', [ 'html' ]);
    gulp.watch('src/lang/*.json', [ 'html' ]);
});

gulp.task('default', [ 'serve', 'fonts', 'css', 'html', 'robots', 'favicons', 'resumes', 'watch' ]);
