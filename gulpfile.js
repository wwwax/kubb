'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browsersync = require('browser-sync').create();

const path = {
    src: {
        html: './src/*.html',
        css: './src/assets/sass/style.scss',
        js: './src/assets/js/**/*.js',
        image: './src/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico}',
    },

    build: {
        html: './dist/',
        css: './dist/assets/css/',
        js: './dist/assets/js/',
        image: './dist/assets/img/',
    },

    watch: {
        html: './src/**/*.html',
        css: './src/assets/sass/**/*.scss',
        js: './src/assets/js/**/*.js',
    },

    clean: './dist/',
};

function browserSync() {
    browsersync.init({
        server: { baseDir: './dist/' },
        port: 3000,
    });
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function html() {
    return gulp
        .src(path.src.html, { base: './src/' })
        .pipe(plumber())
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return gulp
        .src(path.src.css, { base: './src/assets/sass/' })
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return gulp
        .src(path.src.js, { base: './src/assets/js' })
        .pipe(plumber())
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
}

function image() {
    return gulp
        .src(path.src.image, { base: './src/assets/img' })
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.image));
}

function clean() {
    return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, image));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.image = image;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
