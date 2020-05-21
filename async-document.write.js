// Async document.write by Christian "Schepp" Schaefer (@derSchepp)
// MIT license
(function () {
  if (
    !document.currentScript ||
    !(document.createRange()).createContextualFragment ||
    !window.Map
  ) {
    return;
  }

  var originalDocumentWrite = document.write;
  var nextSiblings = new Map();

  document.write = function (html) {
    var sourceScript = document.currentScript;
    var range = document.createRange();

    if (!sourceScript) {
      originalDocumentWrite.apply(document, [html]);
      return;
    }

    var parentElement = sourceScript.parentElement;
    var nextSibling = nextSiblings.get(sourceScript);

    if (nextSiblings === undefined) {
      nextSibling = sourceScript.nextSibling;
      nextSiblings.set(sourceScript, nextSibling);
    }

    var fragment = document.createDocumentFragment();

    range.setStart(fragment, 0);
    fragment.appendChild(range.createContextualFragment(html));
    parentElement.insertBefore(fragment, nextSibling);
  };
})();
