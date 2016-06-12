(function (repositoryService) {
  'use strict';

  var listProjects = function (projects) {
    projects.forEach(function (element, index, array) {
      
    });
  };

  /**
   * Constructs a language li for project-languages navigation.
   **/
  var listLanguages = function (languages) {
    var elm = document.getElementById('project-languages');
    languages.forEach(function (element, index, array) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href', '#');
      a.setAttribute('data-project-language', element);
      a.onclick = languageOnClick;
      var txt = document.createTextNode(element);

      a.appendChild(txt);
      li.appendChild(a);
      elm.appendChild(li);
    });

    initializeFirstLanguage(languages[0]);
  }

  var languageOnClick = function() {
    var language = this.getAttribute('data-project-language');
    window.repositoryService.getProjects(language, listProjects);
  };

  var initializeFirstLanguage = function (language) {
    window.repositoryService.getProjects(language, listProjects);
  }

  window.repositoryService.getLanguages(listLanguages);

})(repositoryService);
