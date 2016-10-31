var gulp = require('gulp'),
    gutil = require("gulp-util"),
    webpack = require('webpack'),
    watch = require('gulp-watch');

var configureWatcher = function() {
    var watcher = watch('./public/**/*', function() {
        gulp.start('webpack');
    });

    watcher.on('change', function(file) {
        gutil.log('[watch]', 'File \'' + file + '\' has been modified...');
    });

    watcher.on('add', function(file) {
        gutil.log('[watch]', 'File \'' + file + '\' has been added...');
    });

    watcher.on('unlink', function(file) {
        gutil.log('[watch]', 'File \'' + file + '\' has been deleted...');
    });

}

gulp.task('webpack', function(callback) {
    webpack(require('./webpack/webpack.dev.js'), function(err, status){
        if(err) throw new gutil.PluginError("webpack", err);

        var regex = /^([A-Z])\w+:.+$/gm;
        var match = regex.exec(status);
        while(!!match) {
            gutil.log("[webpack]", match[0]);
            match = regex.exec(status);
        }
        
        callback();
    });
});

gulp.task('develop', function () {
    configureWatcher();
});

gulp.task('default', 
    [
        'webpack'
    ], 
    function () {
});