(function (repositoryService) {
  'use strict';

  var clearProjects = function() {
    var elm = document.getElementById('project-list');
    while (elm.hasChildNodes()) {
      elm.removeChild(elm.firstChild);
    }
  }

  /**
   * Constructs the project tiles.
   **/
  var listProjects = function (projects) {
    var elm = document.getElementById('project-list');
    var gridPad = undefined;
    projects.forEach(function (element, index, array) {
      var gridCell = document.createElement('div');
      gridCell.setAttribute('class', 'col-1-4 mobile-col-1-2');
      gridCell.setAttribute('data-project-url', element.html_url);

      var languageIcon = languageIconService.getLanguageIcon(element.language);
      var template = '<div onclick="location.href=\'' + element.url + '\'" class="card clickable center">'
                   +   '<div class="content">'
                   +     '<svg class="icon" x="0px" y="0px" viewBox="' + languageIcon.viewBox + '"><use xlink:href="' + languageIcon.logoUrl + '#image"></use></svg>'
                   +     '<h3 class="project-name">' + element.name + "</h3>" 
                   +     '<p>' + (element.description || '') + '</p>'
                   +   '</div>'
                   + '</div>';

      gridCell.innerHTML = template;

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
      a.setAttribute('href', '#projects');
      a.setAttribute('data-project-language', element);
      a.onclick = languageOnClick;
      var txt = document.createTextNode(element);

      a.appendChild(txt);
      li.appendChild(a);
      elm.appendChild(li);
    });

    initializeFirstLanguage(languages[0]);
    window.scrollerInit();
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
