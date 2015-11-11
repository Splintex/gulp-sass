'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    spritesmith  = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    iconfont = require("gulp-iconfont"),
    consolidate = require("gulp-consolidate"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        jsLibs: 'build/js/partials',
        css: 'build/css',
        img: 'build/img/',
        svg: 'build/svg',
        icons: 'build/img/icons',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/*.*',
        sass: 'src/sass/screen.sass',
        img: 'src/img/**/*.*',
        svg: 'src/svg/*.svg',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/*.*',
        sass: 'src/sass/**/*.*',
        img: 'src/img/**/*.*',
        svg: 'src/svg/*.svg',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Devil"
};

gulp.task('copycss', function() {
    gulp.src(path.src.css)
    .pipe(gulp.dest(path.build.css + 'css'));
})

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('sass:build', function () {
    gulp.src(path.src.sass) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/sass/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true,
            indentedSyntax: true
        }))
        .pipe(prefixer({
            browsers: ['> 1%', 'last 3 versions', 'Opera 12.1', 'IE 9', 'IE 10'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function() {
    var spriteData = 
        gulp.src(path.src.icons)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.sass',
                cssFormat: 'sass',
                algorithm: 'binary-tree',
                cssTemplate: 'sass.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('build/img/'));
    spriteData.css.pipe(gulp.dest('./src/sass/lib/')); 
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img));
        // .pipe(reload({stream: true}));
});
// gulp.task('svg:build', function () {
//     gulp.src(path.src.svg) 
//         .pipe(gulp.dest(path.build.svg));
//         // .pipe(reload({stream: true}));
// });

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


// icon font
var fontname = 'svgfont';
gulp.task('font-svg:build', function(){
  return gulp.src('src/font-svg/*.svg')
    // .pipe(svgmin())
    .pipe(iconfont({
      fontName: fontname,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      // timestamp: runTimestamp,
      normalize: true,
      fontHeight: 1001,
      fontStyle: 'normal',
      fontWeight: 'normal'
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs);
        gulp.src('src/helpers/_svgfont.sass')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: '../fonts/',
                className: 'icon'
            }))
            .pipe(gulp.dest('src/sass/'));
        gulp.src('src/helpers/icons.html')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: '../fonts/',
                className: 'icon',
                htmlBefore: '<i class="icon ',
                htmlAfter: '"></i>',
                htmlBr: ''
            }))
            .pipe(gulp.dest('build/'));
    })
    .pipe(gulp.dest('build/fonts/'))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'sass:build',
    'sprite:build',
    'fonts:build',
    'image:build',
    'font-svg:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
       gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.icons], function(event, cb) {
        gulp.start('sprite:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });

    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.svg], function(event, cb) {
        gulp.start('font-svg:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch', 'copycss']);