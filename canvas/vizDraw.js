var VizDraw = (function(window) {
  
  let vizDrawMethods = {};

  /*
  CONTENTS

  1. screen params
  2. maths
  3. draw helpers
  4. shape draw functions

  */

  // 1. screen params

  vizDrawMethods.screen = {

    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth/2,
    centerY: window.innerHeight/2,
    maxRadius: (window.innerHeight-(window.innerWidth/6))/2,
    minRadius: (window.innerHeight/10)/2

  },

  // 2. maths
  // 2.1 make degrees into radians
  vizDrawMethods.radians = function(degrees) {
    return degrees * Math.PI / 180;
  },

  // 3. draw helpers
  // 3.1 distribute shapes 
  // params = total number of items, how spaced out they are (int between 0-1), whether the distribution is uniform or random
  // returns x & y coords in array
  vizDrawMethods.distribute = function(itemCount, spaceHog, uniform = true, twoDee = true) {

    let coords = [];

    if (twoDee) {

    }

    return itemCount*spaceHog;

  }
  

  return vizDrawMethods;

})(window);

// things of interest from Todd: https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/ (there's way more in this article)

// var Module = (function () {
//   var myModule = {};
//   var privateMethod = function () {

//   };
//   myModule.publicMethod = function () {

//   };
//   myModule.anotherPublicMethod = function () {

//   };
//   return myModule; // returns the Object with public methods
// })();

// // usage
// Module.publicMethod();


