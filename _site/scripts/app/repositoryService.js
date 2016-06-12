(function(window, nanoajax, JSON, undefined) {
  'use strict';

  var repositoriesUrl = 'https://api.github.com/users/sgmeyer/repos';
  var repositoryService = window.repositoryService || {};

  var getLanguages = function(success, error) {
    return nanoajax.ajax({url: repositoriesUrl}, function (code, responseText) {
      var languages = new Set();
      var responseObject = {};
      if(code === 200 && success) {
        responseObject = JSON.parse(responseText);
        responseObject.forEach(function (element, index, array) {
          var language = element.language;
          if (language) {
            languages.add(language);
          }
        });

        success(Array.from(languages));
      } else if (error) {
        error('Failed to get languages.');
      }
    });
  };

  var getProjects = function(language, success, error) {
    return nanoajax.ajax({url: repositoriesUrl}, function (code, responseText) {
      var projects = [];
      var responseObject = {};
      if (code == 200 && success) {
        responseObject = JSON.parse(responseText);
        responseObject.forEach(function (element, index, array) {
          if (element.language === language) {
            projects.push({
              name: element.name,
              description: element.description
            });
          }
        });

        success(projects);
      } else if (error) {
        error('Failed to get projects.');
      }
    });
  };

  repositoryService.getLanguages = getLanguages;
  repositoryService.getProjects = getProjects;
  window.repositoryService = repositoryService;
})(window, nanoajax, JSON);
