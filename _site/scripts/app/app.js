(function () {
  'use strict';

  var listLanguages = function (code, languages) {
    var elm = document.getElementById('project-languages');
    languages.forEach(function (element, index, array) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      var txt = document.createTextNode(element);

      a.appendChild(txt);
      li.appendChild(a);
      elm.appendChild(li);
    });
  }

  var x = window.repositoryService.getLanguages(listLanguages)
  console.log(x);

})();
