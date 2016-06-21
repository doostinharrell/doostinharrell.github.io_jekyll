var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var plugins      = require('gulp-load-plugins')();

var jsPaths = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/velocity/velocity.min.js',
  'bower_components/velocity/velocity.ui.min.js',
  'bower_components/foundation-sites/dist/foundation.js',
  'bower_components/smoothscroll-for-websites/SmoothScroll.js',
  'src/js/app.js'
];

var sassPaths = [
  'bower_components/font-awesome/scss',
  'bower_components/foundation-sites/scss'
];

// JS Task
gulp.task('js', function() {
  return gulp.src(jsPaths)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.sourcemaps.write('/'))
    .pipe(gulp.dest('src/html/js'));
});

// SASS Task
gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sassGlob())
    .pipe(plugins.sass({
      includePaths: sassPaths
    }).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(plugins.cleanCss())
    .pipe(plugins.sourcemaps.write('/'))
    .pipe(gulp.dest('src/html/css'))

    // Reload browser
    .pipe(browserSync.reload({stream: true}));
});

// JEKYLL Task
gulp.task('jekyll-build', plugins.shell.task([
  'jekyll build',
  'rsync -r ./dist/html/ ../www --exclude=.sass-cache'
]));

// Browser Sync Initialize Task
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "dustinharrell.boi/index.html",
    port: 3000,
    ui: {
      port: 3001,
      weinre: {
        port: 3002
      }
    }
  })
});

// Watch Task - Watches key files for changes.
gulp.task('watch', function(){
  gulp.watch(['src/js/**/*', 'src/scss/**/*'], ['js', 'sass']);
  gulp.watch(['src/html/**/*', '_config.yml'], ['jekyll-build']);
  gulp.watch('dist/html/**/*').on('change', browserSync.reload);
});

// Default Task - Run browser-sync and watch for changes.
gulp.task('default', ['browser-sync', 'watch']);
