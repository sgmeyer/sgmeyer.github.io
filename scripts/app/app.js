(function (repositoryService) {
  'use strict';

  var clearProjects = function() {
    var elm = document.getElementById('project-list');
    while (elm.hasChildNodes()) {
      elm.removeChild(elm.firstChild);
    }
  }

  var listProjects = function (projects) {
    var elm = document.getElementById('project-list');
    var gridPad = undefined;
    projects.forEach(function (element, index, array) {
      var gridCell = document.createElement('div');
      gridCell.setAttribute('class', 'col-1-4 mobile-col-1-2');
      gridCell.setAttribute('data-project-url', element.html_url);

      var div = document.createElement('div');
      div.setAttribute('class', 'content card');

      var h3 = document.createElement('h3');
      h3.setAttribute('class', 'project-name');

      var h3Txt = document.createTextNode(element.name);
      var txt = document.createTextNode(element.description);

      h3.appendChild(h3Txt);
      div.appendChild(h3);
      div.appendChild(txt);
      gridCell.appendChild(div);

      if(index % 4 === 0) {
        gridPad = document.createElement('div');
        gridPad.setAttribute('class', 'grid grid-pad');
        gridPad.appendChild(gridCell);
        elm.appendChild(gridPad);
      } else {
        gridPad.appendChild(gridCell);
      }
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
