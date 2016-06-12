(function(window, nanoajax, JSON, undefined) {
  'use strict';

  var repositoriesUrl = 'https://api.github.com/users/sgmeyer/repos';
  var repositoryResponseCode = undefined;
  var repositoryResponseText = undefined;
  var repositoryService = window.repositoryService || {};

  var getLanguages = function(success, error) {
    var repositoryCallback = function (code, responseText) {
      var languages = new Set();
      var responseObject = {};
      repositoryResponseCode = code;
      repositoryResponseText = responseText;
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
    };

    if (repositoryResponseText && repositoryResponseCode === 200) {
      repositoryCallback(repositoryResponseCode, repositoryResponseText);
    } else {
      nanoajax.ajax({url: repositoriesUrl}, repositoryCallback);
    }
  };

  var getProjects = function(language, success, error) {
    var repositoryCallback = function (code, responseText) {
      var projects = [];
      var responseObject = {};
      repositoryResponseCode = code;
      repositoryResponseText = responseText;
      if (code == 200 && success) {
        responseObject = JSON.parse(responseText);
        responseObject.forEach(function (element, index, array) {
          if (element.language === language) {
            projects.push({
              name: element.name,
              description: element.description,
              url: element.html_url
            });
          }
        });

        success(projects);
      } else if (error) {
        error('Failed to get projects.');
      }
    };

    if (repositoryResponseText && repositoryResponseCode === 200) {
      repositoryCallback(repositoryResponseCode, repositoryResponseText);
    } else {
      nanoajax.ajax({url: repositoriesUrl}, repositoryCallback);
    }
  };

  repositoryService.getLanguages = getLanguages;
  repositoryService.getProjects = getProjects;
  window.repositoryService = repositoryService;
})(window, nanoajax, JSON);
