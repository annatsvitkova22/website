import React from 'react';
import { createPortal } from 'react-dom';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import Slider from 'react-slick';

import events from '~/components/PhotoSwipeWrapper/events';
import PhotoSwipeWrapper from '~/components/PhotoSwipeWrapper';

class PswpWrapperVideo extends PhotoSwipeWrapper {
  state = {
    isOpen: this.props.isOpen,
    isMounted: false,
    settings: {
      slidesToShow: 6,
      slidesToScroll: 1,
      infinite: false,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted !== this.state.isMounted) {
      // const galleryParams = this.photoswipeParseHash();
      // const { pswpElement } = this;
      this.listen();

      // if (pswpElement && galleryParams) {
      //   const { items, options } = prevProps;

      //   this.photoSwipe = new Photoswipe(
      //     pswpElement,
      //     PhotoswipeUIDefault,
      //     items,
      //     options
      //   );

      //   if (pswpElement.id === `pswp-gallery-${galleryParams.gid}`) {
      //     this.photoSwipe.init();
      //   }
      // }
    }
  }

  listen = () => {
    if (this.photoSwipe) {
      this.photoSwipe.listen('afterChange', () => {
        this.slider.innerSlider.state.currentSlide = this.photoSwipe.getCurrentIndex();
        this.setState((prevState) => ({
          ...prevState,
          settings: {
            ...prevState.settings,
            currentSlide: this.photoSwipe.getCurrentIndex(),
          },
        }));
      });
    }
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

  updateItems = (items = []) => {
    this.photoSwipe.items.length = 0;
    items.forEach((item) => {
      this.photoSwipe.items.push(item);
    });
    this.photoSwipe.invalidateCurrItems();
    this.photoSwipe.updateSize(true);
  };

  closePhotoSwipe = () => {
    if (!this.photoSwipe) {
      return;
    }
    this.photoSwipe.close();
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState(
      {
        isOpen: false,
      },
      () => {
        if (onClose) {
          onClose();
        }
      }
    );
  };

  ref = (node) => {
    this.pswpElement = node;
  };

  imageRef = (index) => (node) => {
    this.thumbnails = this.thumbnails || [];
    this.thumbnails[index] = node;
  };

  handleClick = (index) => () => {
    this.photoSwipe.goTo(index);
  };

  render() {
    const { className, options, items } = this.props;

    if (this.state.isMounted) {
      return createPortal(
        <div
          id={`pswp-gallery-${options.galleryUID ? options.galleryUID : 1}`}
          className={`pswp ${className}`}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          ref={this.ref}
        >
          <div className="pswp__bg" />
          <div className="pswp__scroll-wrap">
            <div className="pswp__container">
              <div className="pswp__item" />
              <div className="pswp__item" />
              <div className="pswp__item" />
            </div>
            <div className="pswp__ui pswp__ui--hidden">
              <div className="pswp__top-bar">
                <div className="pswp__counter" />
                <button
                  className="pswp__button pswp__button--close"
                  title="Close (Esc)"
                />
                <button
                  className="pswp__button pswp__button--share"
                  title="Share"
                />
                <button
                  className="pswp__button pswp__button--fs"
                  title="Toggle fullscreen"
                />
                <button
                  className="pswp__button pswp__button--zoom"
                  title="Zoom in/out"
                />
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip" />
              </div>
              <button
                className="pswp__button pswp__button--arrow--left"
                title="Previous (arrow left)"
              />
              <button
                className="pswp__button pswp__button--arrow--right"
                title="Next (arrow right)"
              />
              <div className="pswp__caption">
                <div className="pswp__caption__center" />
              </div>
            </div>
            <div className="pswp-thumbs">
              <Slider
                {...this.state.settings}
                ref={(slider) => (this.slider = slider)}
              >
                {items.map((item, i) => (
                  <div className="line-height-1">
                    <div
                      className="pswp-thumb bg-cover"
                      key={i}
                      style={{ backgroundImage: `url(${item.thumbUrl})` }}
                      onClick={this.handleClick(i)}
                      ref={this.imageRef(i)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>,
        document.getElementById('modal')
      );
    }

    return '';
  }
}

export default PswpWrapperVideo;
