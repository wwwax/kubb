'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

const path = {
    src: {
        html: './src/*.html',
        css: './src/assets/sass/style.scss',
    },

    build: {
        html: './dist/',
        css: './dist/assets/css/',
    },
};

function html() {
    return gulp
        .src(path.src.html, { base: './src/' })
        .pipe(plumber())
        .pipe(gulp.dest(path.build.html));
}

function css() {
    return gulp
        .src(path.src.css, { base: './src/assets/sass/' })
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(path.build.css));
}

exports.html = html;
exports.css = css;
exports.default = css;
