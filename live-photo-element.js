"use strict";

var LivePhotoElementPrototype = Object.create(HTMLElement.prototype);

LivePhotoElementPrototype.start = function(evt) {
  this.video.style.display = "inline";
  this.img.style.display = "none";
  this.video.play();
  evt.preventDefault();
};

LivePhotoElementPrototype.stop = function(evt) {
  this.img.style.display = "inline";
  this.video.style.display = "none";
  this.video.pause();
  this.video.currentTime = 0;
  evt.preventDefault();
};

LivePhotoElementPrototype.attributeChangedCallback = function(name) {
  if (name === "src") {
    var src = (this.attributes.src || {}).value;
    this.img.src = src;
    this.video.src = src.replace(/\.[^\.]+$/, ".mov");
  }
};

LivePhotoElementPrototype.createdCallback = function() {
  this.img = document.createElement("img");
  this.appendChild(this.img);
  this.video = document.createElement("video");
  this.video.loop = true;
  this.video.style.display = "none";
  this.appendChild(this.video);

  this.addEventListener("mouseenter", this.start);
  this.addEventListener("mouseleave", this.stop);
  this.addEventListener("touchstart", this.start);
  this.addEventListener("touchcancel", this.stop);
  this.addEventListener("touchend", this.stop);

  this.attributeChangedCallback("src");
};

var LivePhotoElement = document.registerElement("live-photo-element", {
  "prototype": LivePhotoElementPrototype
});
