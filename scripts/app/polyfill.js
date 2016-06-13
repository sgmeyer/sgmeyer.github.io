(function () {
  'use strict';
  
  if(!Array.from) {
      Array.from = function (object) {
        var newArray = [];
        
        object.forEach(function (item, index, collection) {
            newArray.push(item);
        });
        return newArray;
      };
  }
})();