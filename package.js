Package.describe({
    name: 'fongandrew:click-out',
    summary: "Helpers for dismissing a lightbox or dropdown upon click " + 
             "outside of zone",
    version: '0.0.1',
    git: '' // TODO
});

Package.onUse(function(api) {
  'use strict';
  api.versionsFrom('METEOR@1.1.0.2');
  api.addFiles('click_out.js', ['client']);
  api.export('ClickOut', ['client']);
});

Package.onTest(function(api) {
  'use strict';
  api.use('tinytest');
  api.use('reactive-var');
  api.use('fongandrew:click-out');
  api.addFiles('click_out_tests.js', ['client']);
});
