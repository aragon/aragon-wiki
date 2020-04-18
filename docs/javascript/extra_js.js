var Countly = Countly || {};
Countly.q = Countly.q || [];
//provide countly initialization parameters
Countly.app_key = 'd32b935378b6cecc6fefe00395f856e7a54c802f';
Countly.url = 'https://analytics.aragon.org/';
Countly.inactivity_time = 10;
Countly.q.push(['track_sessions']);
Countly.q.push(['track_pageview']);
Countly.q.push(['track_clicks']);
Countly.q.push(['track_errors']);
(function() {
  var cly = document.createElement('script'); cly.type = 'text/javascript';
  cly.async = true;
  cly.src = 'https://analytics.aragon.org/sdk/web/countly.min.js';
  cly.onload = function(){Countly.init()};
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
})();
