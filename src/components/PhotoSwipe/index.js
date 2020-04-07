import React from 'react';
import PropTypes from 'prop-types';

import PhotoSwipeWrapper from './PhotoSwipeWrapper';
import events from './events';

class PhotoSwipeGallery extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    options: PropTypes.object,
    thumbnailContent: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    thumbnailContent: (item) => (
      <img src={item.src} width="100" height="100" alt="" />
    ),
    id: '',
    className: '',
    isOpen: false,
    onClose: () => {},
  };

  state = {
    isOpen: this.props.isOpen,
    options: this.props.options,
  };

  componentWillReceiveProps = (nextProps) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.setState({ isOpen: true });
      }
    } else if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  showPhotoSwipe = (itemIndex) => (e) => {
    e.preventDefault();
    const getThumbBoundsFn = (index) => {
      const thumbnail = this.thumbnails[index];
      const img = thumbnail.querySelector('.video-tag__thumbnail');
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

  render() {
    const { id, items, thumbnailContent, ...other } = this.props;
    const { className } = this.props;
    const eventProps = [other, ...events];
    const { isOpen, options } = this.state;
    return (
      <div id={`video-tags-${id}`} className={`pswp-gallery ${className}`}>
        <div className="pswp-thumbnails row">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(node) => {
                this.thumbnails = this.thumbnails || [];
                this.thumbnails[index] = node;
              }}
              className="pswp-thumbnail col-3"
              onClick={this.showPhotoSwipe(index)}
            >
              {thumbnailContent(item)}
            </div>
          ))}
        </div>
        <PhotoSwipeWrapper
          {...eventProps}
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default PhotoSwipeGallery;
