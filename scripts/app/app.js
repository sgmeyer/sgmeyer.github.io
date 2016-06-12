(function (repositoryService) {
  'use strict';

  var clearProjects = function() {
    var elm = document.getElementById('project-list');
    while (elm.hasChildNodes()) {
      elm.removeChild(elm.firstChild);
    }
  }

  var listProjects = function (projects) {
    projects.forEach(function (element, index, array) {
      var elm = document.getElementById('project-list');
      var li = document.createElement('li');
      var a = document.createElement('a');
      var txt = document.createTextNode(element.name + " : " + element.description);
      a.setAttribute('href', element.url);


      a.appendChild(txt);
      li.appendChild(a);
      elm.appendChild(li);
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

    clearProjects();
    window.repositoryService.getProjects(language, listProjects);
  };

  var initializeFirstLanguage = function (language) {
    window.repositoryService.getProjects(language, listProjects);
  }

  window.repositoryService.getLanguages(listLanguages);

})(repositoryService);
