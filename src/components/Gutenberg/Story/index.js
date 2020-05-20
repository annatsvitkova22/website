import React from 'react';
import Slider from 'react-slick';

import './styles.scss';

const images = [
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
    caption: 'Caption',
  },
];
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

const Story = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div>
        <ul className="slick-dots__list">{dots}</ul>
      </div>
    ),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="content__posts gutenberg__story">
      <Slider {...settings}>
        {images.map((image) => {
          return (
            <div>
              <figure className="slick-story__figure">
                <img
                  src={image.url}
                  alt="image"
                  className="slick-story__image"
                />
                <span className="slick-story__overlay" />
                <caption className="slick-story__caption">
                  {image.caption}
                </caption>
              </figure>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Story;
