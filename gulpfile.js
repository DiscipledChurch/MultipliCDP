var del = require('del');
var gulp = require('gulp');
var install = require('gulp-install');
var mocha = require('gulp-spawn-mocha/lib');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var wait = require('gulp-wait');

// Clean 'dist' folder
gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('node-lint', () => {
    return gulp.src('./node/src/**/*.ts')
        .pipe(tslint({
            configuration: './node/tslint.json'
        }))
        .pipe(tslint.report({
            emitError: false
        }));
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
                .pipe(install({ production: true }));
        });
});

// Unit test node
gulp.task('node-test', () => {
    return gulp.src('./node/test/**/*.spec.js')
        .pipe(wait(10000))
        .pipe(mocha({
            r: './node/test.bootstrap'
        }));
});

// Build and unit test all node files
gulp.task('build-node', gulp.series('node-compile', 'node-sourcemaps', 'node-dependencies', 'node-test'));

// Main entry point for linting
gulp.task('lint', gulp.series('node-lint'));

// Main entry point for build
gulp.task('build', gulp.series('clean', 'build-node'));

// Entry point for watching
gulp.task('watch', () => {
    gulp.watch('./node/**/*.ts', gulp.series('build'));
});