// To use ClickOut, register reactive variables with ClickOut.registerVar.
// Then set an event map on the body or an underlying container element that
// calls ClickOut.cull. When cull is called, all registered variables will
// be set to undefined. For a reactive variable to survive a culling, call 
// ClickOut.registerClick on the same(ish) click event that will be passed to
// cull.
ClickOut = {}; // export

(function() {
  'use strict';

  /** Takes a click event and returns a string that can be used to distinguish
   *  different click events.
   *  @params {Event} event - A click event
   *  @returns {String}
   */
  ClickOut._getId = function(event) {
    return [event.offsetX,
            event.offsetY,
            event.timeStamp].join('.');
  };

  // Lookup from key to click identifiers
  ClickOut._clicks = {};

  /** Call to prevent a culling with some click event from deregistering a
   *  previously registered reactive variable.
   *  @param {String} key - The key used to register the variable
   *  @param {Event} event - a click event
   */
  ClickOut.registerClick = function(key, event) {
    var clickId = this._getId(event);
    this._clicks[key] = clickId;
  };

  // Lookup from key to reactive variable
  ClickOut._vars = {};

  /** Register reactive variables to unset during a culling.
   *  @param {String} key - An identifier for this variable. Any previous
   *    variable identified with this key will be replaced.
   *  @param {ReactiveVar} reactiveVar - A reactive variable with a `set` 
   *    method
   */
  ClickOut.registerVar = function(key, reactiveVar) {
    this._vars[key] = reactiveVar;
  };

  /** Set all registered reactive vars to undefined, except for those saved
   *  with a registerClick. 
   *  @param {event} [event] - A click event. If left undefined, then all
   *    variables will be culled.
   */
  ClickOut.cull = function(event) {
    if (event) {
      var clickId = this._getId(event);
    }
    for (var key in this._vars) {      
      if (!clickId || this._clicks[key] !== clickId) {
        var rv = this._vars[key]
        if (typeof(rv.unset) === 'function') {
          rv.unset();
        } else {
          rv.set(undefined);
        }
        delete this._vars[key];
      }
    }

    // Clean up clicks
    this._clicks = {};
  };

})();