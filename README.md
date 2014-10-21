gulp-coffee-react-transform
===========================

Intent
======

A Gulp plugin for converting cjsx files to coffeescript.

Unlike the excellent gulp-cjsx plugin, this does not transpile all the way to JavaScript. Instead, it converts to coffeescript, and pipes the result out.

Uses
====

A good example use is linting.

Coffeelint does not support jsx syntax, so you can't lint cjsx files.

Once the code has been turned into Javascript it's already syntax error free regardless of how badly the coffeescript was written in the first place!

Therefore, you want to lint at the middle point, rather than the start or the end.

e.g.

```
gulp.task('lint', function(){
  var coffeelint = require('gulp-coffeelint')

  gulp.src(['src/**/*.coffee', 'lib/**/*.coffee'])
    .pipe(coffeeReactTransform().on('error', gutil.log))
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
});
```
