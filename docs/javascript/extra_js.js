var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u = "//arastats.eu/staats/";
  _paq.push(['setTrackerUrl', u + 'piwik.php']);
  _paq.push(['setSiteId', '2']);
  var d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0];
  g.type = 'text/javascript';
  g.async = true;
  g.defer = true;
  g.src = u + 'piwik.js';
  s.parentNode.insertBefore(g, s);
})();

window.MathJax = {
  tex2jax: {
    inlineMath: [
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["\\[", "\\]"]
    ]
  },
  TeX: {
    TagSide: "right",
    TagIndent: ".8em",
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "AMS",
    },
    unicode: {
      fonts: "Roboto,'Open Sans'"
    }
  },
  displayAlign: "left",
  showProcessingMessages: false,
  messageStyle: "none"
};
