import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

const svg = (
  <svg
    width="12"
    height="22"
    viewBox="0 0 12 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.1796 0.709272L11.511 1.04068C11.7307 1.26033 11.7307 1.61649 11.511 1.83619L2.34731 11L11.511 20.1638C11.7307 20.3834 11.7307 20.7396 11.511 20.9593L11.1796 21.2907C10.9599 21.5103 10.6038 21.5103 10.3841 21.2907L0.491103 11.3977C0.271447 11.1781 0.271447 10.8219 0.491103 10.6022L10.3841 0.709272C10.6038 0.489569 10.9599 0.489569 11.1796 0.709272Z"
      fill="#242424"
    />
  </svg>
);

const SampleNextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      {svg}
    </div>
  );
};
const SamplePrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} 'my class`}
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      {svg}
    </div>
  );
};

const Slick = ({ images, handleOpen, imageRef, type }) => {
  const settings = {
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div>
        <ul className="slick-dots__list">{dots}</ul>
      </div>
    ),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplaySpeed: 2000,
    autoplay: type === 'story',
  };
  if (type === 'story') {
    return (
      <Slider {...settings}>
        {images.map((image, i) => {
          return (
            <div key={i}>
              <figure className="slick__figure">
                <div className="slick__img-container">
                  <img
                    src={image.url}
                    alt="slick-slide"
                    className="slick__img"
                  />
                  <span className="slick__overlay" />
                  <div className="slick__info">
                    <Icons icon={'gallery'} className="slick__info-icon" />
                    <span className="slick__info-count">
                      {images.length} зображень
                    </span>
                  </div>
                  <button className={'expand-image'}>
                    <Icons icon={'expand'} />
                  </button>
                </div>
                <caption className="slick__caption">
                  {image.author && (
                    <span className="slick__author">{image.description}</span>
                  )}
                  <span className="slick__description">{image.caption}</span>
                </caption>
              </figure>
            </div>
          );
        })}
      </Slider>
    );
  }
  return (
    <Slider {...settings}>
      {images.map((image, i) => {
        return (
          <div
            key={image.id}
            onClick={handleOpen(i) || null}
            ref={imageRef || null}
          >
            <figure className="slick__figure">
              <div className="slick__img-container">
                <img
                  src={image.original}
                  alt="slick-picture"
                  className="slick__img"
                />
                <span className="slick__overlay" />
                <div className="slick__info">
                  <Icons icon={'gallery'} className="slick__info-icon" />
                  <span className="slick__info-count">
                    {images.length} зображень
                  </span>
                </div>
                <button className={'expand-image'}>
                  <Icons icon={'expand'} />
                </button>
              </div>
              <caption className="slick__caption">
                {image.author && (
                  <span className="slick__author">{image.description}</span>
                )}
                <span className="slick__description">
                  {image.description ? image.description : 'Фото'}
                </span>
              </caption>
            </figure>
          </div>
        );
      })}
    </Slider>
  );
};

Slick.propTypes = {
  type: PropTypes.string,
  images: PropTypes.any,
  handleOpen: PropTypes.func,
  imageRef: PropTypes.any,
};

export default Slick;
