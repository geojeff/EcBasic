var g = require('../garcon/lib/garçon'),
    server = new g.Server({ port: 8010, proxyHost: 'localhost', proxyPort: 8080});

myApp = server.addApp({
  name: 'ecbasic'
  //theme: 'ace',
  //buildLanguage: 'french'
});

myApp.addSproutcore();

myApp.addFrameworks(
//  { path: 'frameworks/calendar' },
//  { path: 'themes/my_theme' },
  //{ path: 'frameworks/sproutcore/themes/ace'},
  { path: 'frameworks/sproutcore/themes/empty_theme'},
  { path: 'frameworks/sproutcore/themes/standard_theme'},
  { path: 'frameworks/ki'},
  { path: 'apps/ecbasic'} //, buildLanguage: 'french' }
);

myApp.htmlHead = '<title>EcBasic App</title>';

myApp.htmlBody = [
  '<div id="loading">',
    '<p id="loading">',
	    'Loading…',
	  '</p>',
  '</div>'
].join('\n');

myApp.build();

server.run();
