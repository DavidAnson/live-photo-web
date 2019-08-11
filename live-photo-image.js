"use strict";

class LivePhotoImage extends HTMLImageElement {

  start(evt) {
    if (this.src && !this.originalSrc) {
      this.originalSrc = this.src;
      this.src = this.src.replace(/\.[^\.]+$/, ".gif");
      evt.preventDefault();
    }
  }

  stop(evt) {
    if (this.originalSrc) {
      this.src = this.originalSrc;
      this.originalSrc = null;
      evt.preventDefault();
    }
  }

  connectedCallback() {
    this.addEventListener("mouseenter", this.start);
    this.addEventListener("mouseleave", this.stop);
    this.addEventListener("touchstart", this.start);
    this.addEventListener("touchcancel", this.stop);
    this.addEventListener("touchend", this.stop);
  }
}

customElements.define("live-photo-image", LivePhotoImage, {
  "extends": "img"
});
