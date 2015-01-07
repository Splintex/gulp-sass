var gulp = require('gulp'),
    jade = require('gulp-jade'),
    //spritesmith  = require('gulp.spritesmith'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    nib = require('nib');



/*
 * Создаём задачи 
 *
 * stylus – для CSS-препроцессора Stylus
 * jade – для HTML-препроцессора Jade
 * coffee – для JavaScript-препроцессора CoffeеScript
 * concat – для склейки всех CSS и JS в отдельные файлы
 */

gulp.task('sass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(sass({ 
        noCache : true,
        style   : "compact"
    }))
        .on('error', console.log) // Выводим ошибки в консоль
        .pipe(gulp.dest('./public/css/')) // Выводим сгенерированные CSS-файлы в ту же папку по тем же именем, но с другим расширением
        .pipe(livereload()); // Перезапускаем сервер LiveReload
});

// gulp.task('sprite', function() {
//     var spriteData = 
//         gulp.src('./src/img/icons/*.*') // путь, откуда берем картинки для спрайта
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',
//                 cssName: 'sprite.sass',
//                 cssFormat: 'sass',
//                 algorithm: 'binary-tree',
//                 cssTemplate: 'sass.template.mustache',
//                 cssVarMap: function(sprite) {
//                     sprite.name = 's-' + sprite.name
//                 }
//             }));

//     spriteData.img.pipe(gulp.dest('./public/img/')); // путь, куда сохраняем картинку
//     spriteData.css.pipe(gulp.dest('./src/sass/')); // путь, куда сохраняем стили
// });

gulp.task('jade', function(){
    gulp.src('./src/*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log) // Выводим ошибки в консоль
      .pipe(gulp.dest('./public/')) // Выводим сгенерированные HTML-файлы в ту же папку по тем же именем, но с другим расширением
      .pipe(livereload()); // Перезапускаем сервер LiveReload
});

gulp.task('coffee',function(){
    gulp.src('./src/coffee/*.coffee')
        .pipe(coffee({bare: true}))
        .on('error', console.log) // Выводим ошибки в консоль
       .pipe(gulp.dest('./public/js')) // Выводим сгенерированные JavaScript-файлы в ту же папку по тем же именем, но с другим расширением
       .pipe(livereload()); // Перезапускаем сервер LiveReload
});

gulp.task('concat', function(){
  gulp.task('coffee');
    gulp.src('./public/js/*.js')
        .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/min/'))
        .pipe(livereload());
    gulp.src('./public/css/*.css')
        .pipe(concat('screen.css'))
    .pipe(gulp.dest('./public/min/'))
        .pipe(livereload());
});

gulp.task('imagemin',function(){
     gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});

/*
 * Создадим веб-сервер, чтобы работать с проектом через браузер
 */
 gulp.task('server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(serveStatic(__dirname + '/public'))
      .listen('3333');

    console.log('Сервер работает по адресу http://localhost:3333');
});

 /*
  * Создадим задачу, смотрящую за изменениями
  */
 gulp.task('watch', function(){
      livereload.listen();
        gulp.watch('./src/sass/*.sass',['sass']);
        gulp.watch('./src/img/icons/*.*', ['sprite']);
        gulp.watch('./src/*.jade',['jade']);
        gulp.watch('./src/coffee/*.coffee',['coffee']);
        gulp.watch(['./public/js/*.js','./public/css/*.css'],['concat']);
        gulp.watch('./src/img/**/*',['imagemin']);
      gulp.start('server');
  });

 gulp.task('default',['watch','sass','jade','coffee','concat','imagemin']);
