(function (undefined) {
  'use strict';
  
  var list = undefined;
  var allowScroll = undefined;
  
  var scrollLeft = function () {
    if (allowScroll) {
      var items = list.getElementsByTagName("li");
      console.log(items);
      var item = items[items.length-1];
      console.log(item);
      list.insertBefore(item, list.childNodes[0]); 
    }
  };

  var scrollRight = function () {
	if (allowScroll) {
  	  var item = list.getElementsByTagName("li")[0];
      list.appendChild(item);
    }
  };

  var initialize = function () {
    list = document.getElementById('project-languages')
    allowScroll = list.getElementsByTagName('li').length > 1;
    
    var scrollers = document.querySelectorAll('[data-scroll-direction]');
    for(var i = 0; i < scrollers.length; i++) {
      var scroller = scrollers[i];
      var scrollDirection = scroller.getAttribute('data-scroll-direction');
  
      switch (scrollDirection) {
  	    case 'left': 
    	  scroller.addEventListener('click', scrollLeft);
          break;
        case 'right':
          scroller.addEventListener('click', scrollRight);
          break;
        default:
      }
    }
  }
  
  window.scrollerInit = initialize;
})()