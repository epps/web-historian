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

exports.isUrlArchived = function(uri, callback){
  exports.isUrlInList(uri, function(found) {
    var uriPath = path.join(exports.paths.archivedSites, url.parse("http://" + uri).hostname + ".html");
    fs.exists(uriPath, function() {
      callback();
    });
  });
};

exports.downloadUrls = function(uri, callback){

      request(uri).pipe(fs.createWriteStream(exports.paths.archivedSites));
    }


  // what if there are multiple urls? can we split on /n? is it an array?
  // can we use a length property?
  request(uri).pipe(fs.createWriteStream(exports.paths.archivedSites));
};






