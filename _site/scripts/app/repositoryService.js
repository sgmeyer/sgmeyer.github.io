(function(window, nanoajax, undefined) {
  'use strict';

  var repositoryService = window.repositoryService || {};

  repositoryService.getLanguages = function(callback) {
    return nanoajax.ajax({url:'https://api.github.com/users/sgmeyer/repos'}, function (code, responseText) {
      var languages = new Set();
      var responseObject = {};
      if(code === 200) {
        responseObject = JSON.parse(responseText);

        responseObject.forEach(function (element, index, array) {
          var language = element.language;
          if (language) {
            languages.add(language);
          }
        });
      }
      callback(code, Array.from(languages));
    });
  };

  window.repositoryService = repositoryService;
})(window, nanoajax);
