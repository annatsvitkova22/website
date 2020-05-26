import React from 'react';
import PropTypes from 'prop-types';

import events from '../PhotoSwipeWrapper/events';
import PswpWrapperVideo from '../PhotoSwipeWrapper/components/PswpWrapperVideo';

class PhotoSwipeGallery extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    options: this.props.options,
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.setState({ isOpen: true });
      }
    } else if (isOpen) {
      this.setState({ isOpen: false });
    }
  }

  showPhotoSwipe = (itemIndex) => () => {
    const getThumbBoundsFn = (index) => {
      const thumbnail = this.thumbnails[index];
      const img = thumbnail.querySelector('.video-category__thumbnail');
      const pageYScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const rect = img.getBoundingClientRect();
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    };
    const { options } = this.state;
    options.index = itemIndex;
    options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
    this.setState({
      isOpen: true,
      options,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
    this.props.onClose();
  };

  ref = (index) => (node) => {
    this.thumbnails = this.thumbnails || [];
    this.thumbnails[index] = node;
  };

  render() {
    const { items, thumbnailContent, playClass, ...other } = this.props;
    const { className } = this.props;
    const eventProps = [other, ...events];
    const { isOpen, options } = this.state;
    return (
      <div
        id={`video-category-${options.galleryUID}`}
        className={`pswp-gallery ${className}`}
      >
        <div className="pswp-thumbnails row">
          {items.map((item, index) => (
            <div
              key={index}
              ref={this.ref(index)}
              className="pswp-thumbnail col-lg-3 col-sm-6"
              onClick={this.showPhotoSwipe(index)}
            >
              {thumbnailContent(item, playClass)}
            </div>
          ))}
        </div>
        <PswpWrapperVideo
          {...eventProps}
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}
          className="videos-pswp"
        />
      </div>
    );
  }
}

PhotoSwipeGallery.propTypes = {
  items: PropTypes.array.isRequired,
  playClass: PropTypes.string,
  options: PropTypes.object,
  thumbnailContent: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

PhotoSwipeGallery.defaultProps = {
  options: {},
  thumbnailContent: (item) => (
    <img src={item.src} width="100" height="100" alt="" />
  ),
  id: '',
  className: '',
  isOpen: false,
  onClose: () => {},
};

export default PhotoSwipeGallery;
