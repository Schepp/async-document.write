// Async document.write by Christian "Schepp" Schaefer (@derSchepp)
// MIT license
(function () {
  var originalDocumentWrite = document.write;

  document.write = function (html) {
    var sourceScript = document.currentScript;
    var range = document.createRange();

    if (!sourceScript || !range.createContextualFragment) {
      originalDocumentWrite.apply(document, [html]);
      return;
    }

    var parentElement = sourceScript.parentElement;
    var span = document.createElement('span');

    range.setStart(span, 0);
    parentElement.insertBefore(span, sourceScript.nextElementSibling);
    span.appendChild(range.createContextualFragment(html));
  };
})();
