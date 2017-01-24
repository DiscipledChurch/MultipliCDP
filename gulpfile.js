var del = require('del');
var gulp = require('gulp');
var install = require('gulp-install');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

// Clean 'dist' folder
gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('node-lint', () => {
    return gulp.src('./node/src/**/*.ts')
               .pipe(tslint({
                   configuration: './node/tslint.json'
                }))
               .pipe(tslint.report());
});

// Build node typescript
gulp.task('node-compile', () => {
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = gulp.src('./node/src/**/*.ts')
                       .pipe(tsProject());
                    
    return tsResult.js.pipe(gulp.dest('dist/node'));
});

// Create node sourcemaps
gulp.task('node-sourcemaps', () => {
    return gulp.src('dist/**/*.js')
               .pipe(sourcemaps.init())
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('dist'));
});

// Install node dependencies
gulp.task('node-dependencies', () => {
    return gulp.src('./node/package.json')
               .pipe(gulp.dest('./dist/node'))
               .on('end', () => {
                    gulp.src(['./dist/node/package.json'])
                        .pipe(install({production: true}));
               });
});

// Unit test node
gulp.task('node-test', () => {
    return gulp.src('./node/test/**/*.spec.js')
               .pipe(mocha());
});

// Build and unit test all node files
gulp.task('build-node', gulp.series('node-lint', 'node-compile', 'node-sourcemaps', 'node-dependencies', 'node-test'));

// Main entry point for build
gulp.task('build', gulp.series('clean', 'build-node'));