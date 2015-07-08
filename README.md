# meteor-click-out
This contains helpers functions for dismissing a lightbox or dropdown upon 
clicking on the body or some other HTML element outside of a clickable zone.

Installation
------------
`meteor add fongandrew:click-out`

Usage
-----
The basic idea is to register a bunch of reactive variables with 
`ClickOut.registerVar` and then unset them / set them to undefined when 
`ClickOut.cull` function is called.

Sample usage:

```javascript
Template.myTemplate.onCreated(function() {
  this.myVar = new ReactiveVar(false);
});

Template.myTemplate.helpers({
  myVar: function() {
    var myVar = Template.instance().myVar.get();

    // Does something with myVar that results in helper or dropdown being
    // shown. You might also considering using myVar in a Tracker.autorun
    // attached to this template's onRendered
    // 
    // ....
  }
});

Template.myTemplate.events({
  'click .body-element': function() {
    // This event is what triggers unsetting of registered reactive vars
    ClickOut.cull(e);
  },

  'click .trigger': function(e, template) {
    template.myVar.set(true);
    
    // When registering a reactive variable, you need to provide a unique
    // key to link variables and click events 
    ClickOut.registerVar('my-key', template.myVar);

    // If you don't register this click event, this click will unset the
    // var before you even set it.
    ClickOut.registerClick('my-key', e);
  },

  'click .inside-dropdown': function(e) {
    // By registering click, clicks on .inside-dropdown but also on 
    // .body-element won't trigger culling of reactive vars
    ClickOut.registerClick('my-key', e);
  }
});
```