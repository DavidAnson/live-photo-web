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
    this.video.src = src.replace(/\.[^\.]+$/, ".mp4");
  }
};

LivePhotoElementPrototype.createdCallback = function() {
  this.img = document.createElement("img");
  this.appendChild(this.img);
  this.video = document.createElement("video");
  this.video.playsInline = true;
  this.video.loop = true;
  this.video.style.display = "none";
  this.appendChild(this.video);

  var start = this.start.bind(this);
  var stop = this.stop.bind(this);
  [this.img, this.video].forEach(function(element) {
    element.addEventListener("mouseenter", start);
    element.addEventListener("mouseleave", stop);
    element.addEventListener("touchstart", start);
    element.addEventListener("touchcancel", stop);
    element.addEventListener("touchend", stop);
  });

  this.attributeChangedCallback("src");
};

var LivePhotoElement = document.registerElement("live-photo-element", {
  "prototype": LivePhotoElementPrototype
});
