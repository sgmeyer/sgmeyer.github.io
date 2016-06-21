(function(window, nanoajax, JSON, undefined) {
  'use strict';

  var repositoriesUrl = 'https://api.github.com/users/sgmeyer/repos';
  var cachedRepositoriesUrl = '/repos.json';
  var repositoryResponseCode = undefined;
  var repositoryResponseText = undefined;
  var repositoryService = window.repositoryService || {};
  var sentinel = false;

  var getLanguages = function(success, error) {
    var repositoryCallback = function (code, responseText, xhr, retrySentinel) {
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
      } else if (!retrySentinel) {

        nanoajax.ajax({url: cachedRepositoriesUrl}, function (code, responseText, xhr) {
          repositoryCallback(code, responseText, xhr, true)
        });
      } else if (error) {
        error("Failed to download repository.");
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
              url: element.html_url,
              language: element.language
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
