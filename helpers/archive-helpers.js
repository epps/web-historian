var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var url = require('url');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  testArchives: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(error, data) {
    var dataStr = data.toString().split('\n');
    callback(dataStr);
  });
};

exports.isUrlInList = function(target,callback){
  exports.readListOfUrls(function(dataStr) {
    var targetIsFound = _.contains(dataStr, target);
    callback(targetIsFound);
  });
};

exports.addUrlToList = function(uri,callback){
  exports.isUrlInList(uri, function(uriFound) {
    if(!uriFound) {
      fs.appendFile(exports.paths.list, uri, function() {
      callback();
     });
    }
  });
};

/* For CRON */

exports.createPath = function(uri, callback) {
  var uriPath = path.join(exports.paths.archivedSites, url.parse("http://" + uri).hostname);

   callback(uriPath);
}

exports.isUrlArchived = function(uriPath, callback){
  // var uriPath = path.join(exports.paths.archivedSites, url.parse("http://" + uri).hostname);
  fs.exists(uriPath, function(exists) {
    callback(exists);
  });
};


exports.downloadUrls = function(listUrls){
  listUrls.forEach(function(url) {
    exports.isUrlArchived(url, function(isArchived) {
      if(!isArchived) {
        var newPath = path.join(exports.paths.archivedSites + "/" + url);
        request('http://' + url).pipe(fs.createWriteStream(newPath));
      }
    });
  });
};






