import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import events from './events';

import ShareModal from '~/components/Share/Modal';

class PhotoSwipeWrapper extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    options: PropTypes.object,
    onClose: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    isModalOpen: PropTypes.bool,
    handleModalClose: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    onClose: () => {},
    id: '',
    className: '',
  };

  state = {
    isOpen: this.props.isOpen,
    isMounted: false,
  };

  componentDidMount() {
    const { isOpen } = this.state;
    if (isOpen) {
      this.openPhotoSwipe(this.props);
    }

    this.setState({
      isMounted: true,
    });
  }

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

        if (pswpElement.id === `pswp-gallery-${galleryParams.gid}`) {
          this.photoSwipe.init();
        }
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
    }
    // Hope it is not important
    /* else if (isOpen) {
      this.closePhotoSwipe();
    } */
  }

  componentWillUnmount() {
    this.closePhotoSwipe();
  }

  openPhotoSwipe = (props) => {
    const { items, options } = props;
    const { pswpElement } = this;
    this.photoSwipe = new Photoswipe(
      pswpElement,
      PhotoswipeUIDefault,
      items,
      options
    );

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
    if (!this.props.isModalOpen) {
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
    }
  };

  ref = (node) => {
    this.pswpElement = node;
  };

  render() {
    const { className, options, isModalOpen, handleModalClose } = this.props;
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
          </div>
          {isModalOpen && (
            <ShareModal
              onClose={handleModalClose}
              location={window.location.href}
            />
          )}
        </div>,
        document.getElementById('modal')
      );
    }

    return '';
  }
}

PhotoSwipeWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  options: PropTypes.object,
  onClose: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  isModalOpen: PropTypes.bool,
  handleModalClose: PropTypes.func,
};

PhotoSwipeWrapper.defaultProps = {
  options: {},
  onClose: () => {},
  id: '',
  className: '',
};

export default PhotoSwipeWrapper;
