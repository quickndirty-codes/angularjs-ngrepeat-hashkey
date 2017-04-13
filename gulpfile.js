'use strict';

var gulp = require('gulp'),
    expect = require('gulp-expect-file'),
    sass = require('gulp-sass'),
    es = require('event-stream'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    argv = require('yargs').argv;


var handleErrors = function() {

    var args = Array.prototype.slice.call(arguments);
    var notification = argv.notification === undefined ? true : argv.notification;
    // Send error to notification center with gulp-notify
    if(notification) {
        notify.onError({
            title:    "Gulp Build",
            subtitle: "Failure!",
            message:  "Error: <%= error.message %>",
            sound:    "Beep"
        }).apply(this, args);
    }
    // Keep gulp from hanging on this task
    this.emit('end');

};

gulp.task('sass', function () {
    return es.merge(
        gulp.src('sass/*main*.{scss,sass}')
            .pipe(plumber({errorHandler: handleErrors}))
            .pipe(expect('sass/*main*.{scss,sass}'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('public/assets/styles'))
    );
});

gulp.task('default', ['sass']);