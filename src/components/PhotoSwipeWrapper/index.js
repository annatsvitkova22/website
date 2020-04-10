import React from 'react';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import events from './events';

class PhotoSwipeWrapper extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    options: PropTypes.object,
    onClose: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    options: {},
    onClose: () => {},
    id: '',
    className: '',
  };

  state = {
    isOpen: this.props.isOpen,
  };

  componentDidMount() {
    const { isOpen } = this.state;
    if (isOpen) {
      this.openPhotoSwipe(this.props);
    }

    const galleryParams = this.photoswipeParseHash();
    if (galleryParams) {
      const { items, options } = this.props;
      const { pswpElement } = this;

      this.photoSwipe = new Photoswipe(
        pswpElement,
        PhotoswipeUIDefault,
        items,
        options
      );

      this.listen();

      if (pswpElement.id === galleryParams.gid) {
        this.photoSwipe.init();
      }
    }
  }

  photoswipeParseHash = () => {
    const hash = window.location.hash.substring(1);
    const params = {};

    if (hash.length < 5) {
      // pid=1
      return false;
    }

    const vars = hash.split('&');
    for (let i = 0; i < vars.length; i += 1) {
      let pair = [];
      if (vars[i]) {
        pair = vars[i].split('=');
      }

      if (pair.length === 2) {
        const [id, value] = pair;
        params[id] = value;
      }
    }
    if (Object.keys(params).length !== 0) {
      return params;
    }

    return false;
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.openPhotoSwipe(nextProps);
      } else {
        this.updateItems(nextProps.items);
      }
    } else if (isOpen) {
      this.closePhotoSwipe();
    }
  }

  componentWillUnmount = () => {
    this.closePhotoSwipe();
  };

  listen = () => {
    const pauseVideo = () => {
      const iframes = document.querySelectorAll('.video-tag__iframe iframe');
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

  render() {
    const { options } = this.props;
    const { className } = this.props;
    return (
      <div
        id={options.galleryUID}
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
        </div>
      </div>
    );
  }
}

PhotoSwipeWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  options: PropTypes.object,
  onClose: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
};

PhotoSwipeWrapper.defaultProps = {
  options: {},
  onClose: () => {},
  id: '',
  className: '',
};

export default PhotoSwipeWrapper;
