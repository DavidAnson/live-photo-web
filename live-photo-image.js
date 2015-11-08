"use strict";

var LivePhotoImagePrototype = Object.create(HTMLImageElement.prototype);

LivePhotoImagePrototype.start = function() {
  if (this.src && !this.originalSrc) {
    this.originalSrc = this.src;
    this.src = this.src.replace(/\.[^\.]+$/, ".gif");
  }
};

LivePhotoImagePrototype.stop = function() {
  if (this.originalSrc) {
    this.src = this.originalSrc;
    this.originalSrc = null;
  }
};

LivePhotoImagePrototype.createdCallback = function() {
  this.addEventListener("mouseenter", this.start);
  this.addEventListener("mouseleave", this.stop);
  this.addEventListener("touchstart", this.start);
  this.addEventListener("touchcancel", this.stop);
  this.addEventListener("touchend", this.stop);
};

var LivePhotoImage = document.registerElement("live-photo", {
  "prototype": LivePhotoImagePrototype,
  "extends": "img"
});
