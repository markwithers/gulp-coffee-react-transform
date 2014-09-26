// through2 is a thin wrapper around node transform streams
var through = require('through2').obj;
var gutil = require('gulp-util');
var Buffer = require('buffer').Buffer;
var PluginError = gutil.PluginError;

// coffee react transform - converts cjsx files to coffeescript
var coffeeReact = require('coffee-react-transform');

function error(err, options) {
  return new gutil.PluginError('gulp-coffee-react-transform', err, options);
};

module.exports = function(opt) {
  function modifyFile(file, enc, callback) {
    if (file.isNull()) return callback(null, file); // pass along
    if (file.isStream()) return callback(error('Streaming not supported'));

    var data;
    var str = file.contents.toString('utf8');

    try {
      data = coffeeReact(str);
    } catch (err) {
      return callback(error(err))
    }

    file.contents = new Buffer(data);

    callback(null, file)
  };

  return through(modifyFile);
};
