import React from 'react';
import PropTypes from 'prop-types';

import NavLink from '~/components/SiteLink';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import Head from 'next/head';
import NumberFormat from 'react-number-format';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Moment from 'react-moment';


const CfPostItem = (props) => {
  const ref = React.useRef();
  const { item } = props;
  const [isVisible, setIsVisible] = React.useState(false);

  //console.log(JSON.stringify(item));

  /*
  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });
  */

  //const cfDate = new Date(item.date);

  return (
    <div className="col-4">
      <div className="cfitem">
        <div className="cfitem__thumb">
          <img src={item.featuredImage.guid} alt={item.title + 'thumbnail'}/>
          <div className="cfitem__thumb__status">Йде збір</div>
        </div>
        <div className="cfitem__container">
          <div className="cfitem__title">
            <a title={item.title} href={item.uri}>{item.title}</a>
          </div>
          <div className="cfitem__descr">
            <div dangerouslySetInnerHTML={{ __html: item.excerpt }}/>
          </div>
          <div className="cfitem__collected">
            <div className="cfitem__collected__amount">
              <NumberFormat value={10000} displayType={'text'} format="## ### ### ₴"/>
              Зібрано з <NumberFormat value={item.cfACF.crowdfundingRequiredAmountToCollect} displayType={'text'}
                                      format="## ### ### ₴"/>
              <ProgressBar now={60}/>
            </div>
          </div>
          <div className="cfitem__collected__left">
            <img src="/assets/crowdfundings/clock.png"/>
            <Moment parse="DD/MM/YYYY HH:mm:ss"
                    format="DD/MM/YYYY">{item.cfACF.crowdfundingExpirationDate}</Moment> завершення
          </div>
        </div>
      </div>
    </div>
  );
};

CfPostItem.propTypes = {
  item: PropTypes.any,
};

export default CfPostItem;
