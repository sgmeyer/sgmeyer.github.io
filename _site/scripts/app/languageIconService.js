(function (window) {
  'use strict';

  var languageIconService = window.languageMapService || {};
  var defaultIcon = 'images/code.svg'
  var languageMap = [
    { key: 'CoffeeScript', logoUrl: 'images/coffeescript.svg' },
    { key: 'C#', logoUrl: 'images/csharp.svg' },
    { key: 'CSS', logoUrl: 'images/css.svg' },
    { key: '.Net', logoUrl: 'images/dotNet.svg' },
    { key: 'HTML', logoUrl: 'images/html.svg' },
    { key: 'JavaScript', logoUrl: 'images/javascript.svg' },
    { key: 'Shell', logoUrl: 'images/shell.svg' }
  ];

  var getLanguageIcon = function (language) {

    var icon = defaultIcon;
    languageMap.forEach(function (element, index, array) {
      if (element.key == language) {
        icon = element.logoUrl;
        return;
      }
    });

    return icon;
  };

  languageIconService.getLanguageIcon = getLanguageIcon;
  window.languageIconService = languageIconService;
})(window);
