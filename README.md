# live-photo-web

Apple introduced [Live Photos](http://www.apple.com/ios/photos/) with iOS 9, a
feature that automatically associates a short video with every picture that's
taken. I was skeptical at first, wondering how relevant this would be for static
content; and it turns out not to be all that compelling for some kinds of photos.
But for dynamic scenes or people in motion, the video can add some really
interesting context!

Live Photos on iOS are (naturally) smooth and easy to use. I wondered what it
might be like to bring a similar experience to the web. I'd also been looking
for a reason to explore [Web Components](https://en.wikipedia.org/wiki/Web_Components).
And so `live-photo-web` was born!

## Demo

[Click here for a simple demonstration of the techniques described below.](http://dlaa.me/Samples/live-photo-web/)

## live-photo-image

An easy way to implement the Live Photo effect is to start with a standard
[`img` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
and swap out it's `src` property with an
[animated `gif`](https://en.wikipedia.org/wiki/GIF#Animated_GIF) when the user
touches the image or hovers the mouse over it. This is easy to do with a bit of
JavaScript and some code to attach the event handlers - though it's nice to
package everything up for reuse. Fortunately, there's an emerging standard that
enables just that: Web Components. And while browser support for web components
is [not yet universal](http://caniuse.com/#feat=custom-elements), a handy
polyfill exists thanks to [WebComponents.org](http://webcomponents.org/). It
ends up being straightforward to write a simple extension to the `img` element
that listens to the `mouseenter`, `mouseleave`, `touchstart`, `touchend`, and
`touchcancel` events to implement the desired behavior. Using it is easy; just
decorate an existing `img` element with the `is` syntax and make sure a `gif`
image of the same name exists alongside the original `src` image.

Here's what it looks like in practice:

```html
<img is="live-photo-image" src="sample.jpg"/>
```

*See [`live-photo-image.js`](live-photo-image.js) for the complete implementation.*

`gif` images are convenient because they're natively supported by the `img` tag
in all browsers, automatically play themselves, and automatically loop. However,
the `gif` format is poorly suited to storing photo-realistic movies, so file
size can be very large (5.19 MB in the example). An (optional) enhancement is
to have the browser prefetch the `gif` image after loading the page so it will
already be cached by the time it's needed. The
[`link`/`rel`/`prefetch` tag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
is ideal for this and looks like the following:

```html
<link rel="prefetch" href="sample.gif"/>
```

## live-photo-element

Enhancing an `img` element is simple enough, but creating a dedicated Live
Photo element offers even more possibilities. In particular, instead of swapping
out the `src` to show a `gif`, the code can swap out the entire `img` for a
[`video` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
to get better quality, much smaller file size - and sound! Add the same
mouse/touch logic as above, drop an `mp4` video alongside the original `src`
image, update the HTML, and you end up with a much richer experience.

Here's what it looks like in practice:

```html
<live-photo-element src="sample.jpg"></live-photo-element>
```

*See [`live-photo-element.js`](live-photo-element.js) for the complete implementation.*

Unfortunately, there are two drawbacks with this approach. The first is that
`video` and `mp4` are not as universally supported as `gif`, so there are some
browsers where things don't work smoothly (or possibly at all). Ironically,
because [iPhone doesn't allow embedded video in Safari](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html),
the platform that inspired this project behaves the worst. The second drawback
is that the format for Live Photo movies, `mov`, is not natively supported by
all platforms (notably Windows), so it's a good idea to transcode the `mov` to
a more popular format like `mp4`. On the plus side, transcoding is a good
opportunity to resize the movie to fit the target scenario - leading to a very
compact file size (just 329 KB in the example).

## Thanks

- [WebComponents.org](http://webcomponents.org/)
- [LiveToGIF for iOS](https://david-smith.org/blog/2015/11/03/introducing-livetogif/)
- [Lively for iOS](http://lively.tinywhale.net/)
- [HandBrake](https://handbrake.fr/)
