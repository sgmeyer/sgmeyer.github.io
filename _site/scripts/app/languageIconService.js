(function (window) {
  'use strict';

  var languageIconService = window.languageMapService || {};
  var defaultIcon = { key: 'default', logoUrl: 'images/code.svg', viewBox: '0 0 24 24' };
  var languageMap = [
    { key: 'CoffeeScript', logoUrl: 'images/coffeescript.svg', viewBox: '0 0 24 24' },
    { key: 'C#', logoUrl: 'images/csharp.svg', viewBox: '0 0 24 24' },
    { key: 'CSS', logoUrl: 'images/css.svg', viewBox: '0 0 24 24' },
    { key: '.Net', logoUrl: 'images/dotNet.svg', viewBox: '0 0 24 24' },
    { key: 'HTML', logoUrl: 'images/html.svg', viewBox: '0 0 24 24' },
    { key: 'JavaScript', logoUrl: 'images/javascript.svg', viewBox: '0 0 24 24' },
    { key: 'Shell', logoUrl: 'images/shell.svg', viewBox: '0 0 32 32' }
  ];

  var getLanguageIcon = function (language) {

    var icon = defaultIcon;
    languageMap.forEach(function (element, index, array) {
      if (element.key == language) {
        icon = element;
        return;
      }
    });

    return icon;
  };

  languageIconService.getLanguageIcon = getLanguageIcon;
  window.languageIconService = languageIconService;
})(window);
