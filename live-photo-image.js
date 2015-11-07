"use strict";

var LivePhotoImagePrototype = Object.create(HTMLImageElement.prototype);

LivePhotoImagePrototype.createdCallback = function() {
  this.addEventListener("mouseenter", function() {
    if (this.src) {
      this.originalSrc = this.src;
      this.src = this.src.replace(/\.[^\.]+$/, ".gif");
    }
  });
  this.addEventListener("mouseleave", function() {
    if (this.originalSrc) {
      this.src = this.originalSrc;
      this.originalSrc = null;
    }
  });
};

var LivePhotoImage = document.registerElement("live-photo", {
  prototype: LivePhotoImagePrototype,
  extends: "img"
});
