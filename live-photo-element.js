"use strict";

class LivePhotoElement extends HTMLElement {

  static get observedAttributes() {
    return ["src"];
  }

  start(evt) {
    this.video.style.display = "inline";
    this.img.style.display = "none";
    this.video.play();
    evt.preventDefault();
  }

  stop(evt) {
    this.img.style.display = "inline";
    this.video.style.display = "none";
    this.video.pause();
    this.video.currentTime = 0;
    evt.preventDefault();
  }

  attributeChangedCallback(name, old, value) {
    if (name === "src") {
      const src = value || this.attributes.src.value;
      if (this.img && this.video) {
        this.img.src = src;
        this.video.src = src.replace(/\.[^\.]+$/, ".mp4");
      }
    }
  }

  connectedCallback() {
    this.img = document.createElement("img");
    this.appendChild(this.img);
    this.video = document.createElement("video");
    this.video.playsInline = true;
    this.video.loop = true;
    this.video.style.display = "none";
    this.appendChild(this.video);

    const start = this.start.bind(this);
    const stop = this.stop.bind(this);
    [this.img, this.video].forEach(function(element) {
      element.addEventListener("mouseenter", start);
      element.addEventListener("mouseleave", stop);
      element.addEventListener("touchstart", start);
      element.addEventListener("touchcancel", stop);
      element.addEventListener("touchend", stop);
    });

    this.attributeChangedCallback("src");
  }
}

customElements.define("live-photo-element", LivePhotoElement);
