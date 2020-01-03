var gulp = require("gulp");
var pug = require("gulp-pug");
var watch = require("gulp-watch")
var sourcemaps = require("gulp-sourcemaps");
var scss = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

gulp.task("pug", function() {

    return gulp.src("project/*.pug").pipe(pug({ pretty: true })).pipe(gulp.dest('dist/')).pipe(browserSync.stream());

});



gulp.task("sass", function() {
    return gulp.src(["project/scss/*.scss"])
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat("css/main.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
});


gulp.task("js", function() {
    return gulp.src("project/js/*.js").pipe(uglify()).
    pipe(rename('main.min.js')).
    pipe(gulp.dest('dist/js')).
    pipe(browserSync.stream());
})



gulp.task("watches", function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("project/scss/*.scss", gulp.series("sass"));
    gulp.watch("project/*.pug", gulp.series("pug"));
    gulp.watch("project/js/*.js", gulp.series("js"));

});

gulp.task("default", gulp.series("watches"));