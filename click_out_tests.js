(function() {
  'use strict';

  // Helper to make a fake click event
  var makeClickEvent = function() {
    var min = 0;
    var max = 2000;
    return {
      offsetX: Math.floor(Math.random() * (max - min)) + min,
      offsetY: Math.floor(Math.random() * (max - min)) + min,
      timeStamp: (new Date()).getTime()
    };
  };

  Tinytest.add("ClickOut - cull one", function(test) {
    var myVar = new ReactiveVar("hello");
    ClickOut.registerVar("someKey", myVar);
    var click = makeClickEvent();
    ClickOut.cull(click);
    test.equal(myVar.get(), undefined);
  });

  Tinytest.add("ClickOut - don't cull if replaced", function(test) {
    var myVar = new ReactiveVar("hello");
    var myOtherVar = new ReactiveVar("world");
    ClickOut.registerVar("someKey", myVar);
    ClickOut.registerVar("someKey", myOtherVar);

    var click = makeClickEvent();
    ClickOut.cull(click);

    test.equal(myVar.get(), "hello");
    test.equal(myOtherVar.get(), undefined);
  });

  Tinytest.add("ClickOut - cull unless registered", function(test) {
    var myVar = new ReactiveVar("hello");
    var myOtherVar = new ReactiveVar("world");
    ClickOut.registerVar("someKey", myVar);
    ClickOut.registerVar("otherKey", myOtherVar);

    var click = makeClickEvent();
    ClickOut.registerClick("someKey", click);
    ClickOut.cull(click);

    test.equal(myVar.get(), "hello");
    test.equal(myOtherVar.get(), undefined);
  });

  Tinytest.add("ClickOut - one-time registration", function(test) {
    var myVar = new ReactiveVar("hello");
    ClickOut.registerVar("someKey", myVar);

    var click = makeClickEvent();
    ClickOut.registerClick("someKey", click);
    ClickOut.cull(click);
    test.equal(myVar.get(), "hello");

    ClickOut.cull(click);
    test.equal(myVar.get(), undefined);
  });

})();