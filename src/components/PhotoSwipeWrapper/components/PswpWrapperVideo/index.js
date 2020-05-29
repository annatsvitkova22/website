import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import events from '~/components/PhotoSwipeWrapper/events';
import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';

class PswpWrapperVideo extends PhotoSwipeWrapper {
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted !== this.state.isMounted) {
      const galleryParams = this.photoswipeParseHash();
      const { pswpElement } = this;

      if (pswpElement && galleryParams) {
        const { items, options } = prevProps;

        this.photoSwipe = new Photoswipe(
          pswpElement,
          PhotoswipeUIDefault,
          items,
          options
        );

        this.listen();

        if (pswpElement.id === `pswp-gallery-${galleryParams.gid}`) {
          this.photoSwipe.init();
        }
      }
    }
  }

  listen = () => {
    const pauseVideo = () => {
      const iframes = document.querySelectorAll(
        '.video-category__iframe iframe'
      );
      iframes.forEach((iframe) => {
        const { src } = iframe;
        iframe.setAttribute('src', src);
      });
    };

    this.photoSwipe.listen('close', pauseVideo);
    this.photoSwipe.listen('beforeChange', pauseVideo);
  };

  openPhotoSwipe = (props) => {
    const { items, options } = props;
    const { pswpElement } = this;
    this.photoSwipe = new Photoswipe(
      pswpElement,
      PhotoswipeUIDefault,
      items,
      options
    );
    this.listen();
    events.forEach((event) => {
      const callback = props[event];
      if (callback || event === 'destroy') {
        const self = this;
        this.photoSwipe.listen(event, (...args) => {
          if (callback) {
            args.unshift(this);
            callback(...args);
          }
          if (event === 'destroy') {
            self.handleClose();
          }
        });
      }
    });
    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.photoSwipe.init();
      }
    );
  };
}

export default PswpWrapperVideo;
