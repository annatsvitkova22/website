import React from 'react';

import useFilterHook from '~/hooks/useFilterHook';
import '../styles/components/eventsPost.scss';
import EventPostItem from '~/components/EventsPostItem';

// const useOnScreen = (options) => {
//   const [ref, setRef] = React.useState(null);
//   const [visible, setVisible] = React.useState(false);
//
//   React.useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//     }, options);
//
//     if (ref) {
//       observer.observe(ref);
//     }
//
//     return () => {
//       if (ref) {
//         observer.unobserve(ref);
//       }
//     };
//   }, [setRef, options]);
//
//   return { setRef, visible };
// };

const EventsPost = (props) => {
  const { filter, eventsData, date } = props;

  const { data } = useFilterHook(filter, eventsData, date);

  // const { setRef, visible } = useOnScreen({ threshold: 0.2 });

  return (
    <div>
      {data &&
        data.map((item, index) => {
          return <EventPostItem key={index} item={item} />;
        })}
    </div>
  );
};

export default EventsPost;
