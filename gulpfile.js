'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const uglify = require('gulp-uglify');
const panini = require('panini');
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
    panini.refresh();
    return gulp
        .src(path.src.html, { base: './src/' })
        .pipe(plumber())
        .pipe(
            panini({
                root: './src/',
                layouts: './src/tpl/layouts',
                partials: './src/tpl/partials',
            }),
        )
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return gulp
        .src(path.src.css, { base: './src/assets/sass/' })
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({ cascade: true }))
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.build.css))
        .pipe(
            cssnano({
                zindex: false,
                discardComments: { removeAll: true },
            }),
        )
        .pipe(removeComments())
        .pipe(
            rename({
                suffix: '.min',
                extname: '.css',
            }),
        )
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return gulp
        .src(path.src.js, { base: './src/assets/js' })
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                suffix: '.min',
                extname: '.js',
            }),
        )
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
