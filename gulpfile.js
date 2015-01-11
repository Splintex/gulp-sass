var gulp = require('gulp'),
    //jade = require('gulp-jade'),
    spritesmith  = require('gulp.spritesmith'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    nib = require('nib');

// sass
gulp.task('sass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(sass({style: 'expanded', 'sourcemap=none': true}))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Opera 12.1', 'IE 9', 'IE 8'],
            cascade: false
        }))
        .on('error', console.log)
        .pipe(gulp.dest('./public/css/')) 
        .pipe(livereload()); 
});

// spritesmith
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/img/icons/*.*')
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

    spriteData.img.pipe(gulp.dest('./public/img/'));
    spriteData.css.pipe(gulp.dest('./src/sass/lib/')); 
});

// jade
// gulp.task('jade', function(){
//     gulp.src('./src/*.jade')
//         .pipe(jade({pretty: true}))
//         .on('error', console.log) 
//       .pipe(gulp.dest('./public/'))
//       .pipe(livereload());
// });


// javascript
gulp.task('javascript',function(){
    gulp.src('./src/js/**/*')
        .on('error', console.log)
       .pipe(gulp.dest('./public/js'))
       .pipe(livereload());
});

// concat
gulp.task('concat', function(){
    gulp.task('javascript');
    gulp.src('./public/js/*.js')
        .pipe(concat('common.js'))
        .pipe(livereload());
    gulp.src('./public/css/*.css')
        .pipe(concat('screen.css'))
        .pipe(livereload());
});

// min images
gulp.task('imagemin',function(){
     gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});

// html compile and html includes
gulp.task('fileinclude', function() {
  gulp.src(['./src/*.html'])
    .on('error', console.log)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

// local server
 gulp.task('server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(serveStatic(__dirname + '/public'))
      .listen('3333');

    console.log('Сервер работает по адресу http://localhost:3333');
});

// watching changes

 gulp.task('watch', function(){
      livereload.listen();
        gulp.watch('./src/sass/*.sass',['sass']);
        gulp.watch('./src/img/icons/*.*', ['sprite']);
        //gulp.watch('./src/*.jade',['jade']);
        gulp.watch('./src/*.html',['fileinclude']);
        gulp.watch('./src/js/**/*',['javascript']);
        gulp.watch(['./public/js/*.js','./public/css/*.css'],['concat']);
        gulp.watch('./src/img/**/*',['imagemin']);
      gulp.start('server');
  });

gulp.task('default',['watch','sprite','sass','fileinclude','javascript','concat','imagemin']);
