import React from 'react';
import ContentLoader from 'react-content-loader';
import { times } from 'lodash';

const step = 48;

const HomeHeroLoader = () => {
  return (
    <ContentLoader viewBox={'0 0 1300 1000'}>
      <rect x={'0'} y={'0'} width={'760'} height={`760`} />

      <rect x={'784'} y={'0'} width={'210'} height={`140`} />
      <rect x={'784'} y={'156'} width={'78'} height={`17`} />
      <rect x={'784'} y={'183'} width={'170'} height={`14`} />
      <rect x={'784'} y={'200'} width={'185'} height={`14`} />
      <rect x={'784'} y={'217'} width={'190'} height={`14`} />
      <rect x={'784'} y={'234'} width={'180'} height={`14`} />
      <rect x={'784'} y={'262'} width={'40'} height={`16`} />

      <rect x={'784'} y={'302'} width={'210'} height={`140`} />
      <rect x={'784'} y={'458'} width={'78'} height={`17`} />
      <rect x={'784'} y={'485'} width={'160'} height={`14`} />
      <rect x={'784'} y={'502'} width={'155'} height={`14`} />
      <rect x={'784'} y={'519'} width={'190'} height={`14`} />
      <rect x={'784'} y={'547'} width={'40'} height={`16`} />

      <rect x={'784'} y={'587'} width={'210'} height={`140`} />
      <rect x={'784'} y={'743'} width={'78'} height={`17`} />
      <rect x={'784'} y={'770'} width={'170'} height={`14`} />
      <rect x={'784'} y={'787'} width={'185'} height={`14`} />
      <rect x={'784'} y={'804'} width={'190'} height={`14`} />
      <rect x={'784'} y={'821'} width={'180'} height={`14`} />
      <rect x={'784'} y={'849'} width={'40'} height={`16`} />

      {times(20, (i) => {
        return (
          <>
            <rect x={'1018'} y={step * i + 1} width={'50'} height={`12`} />
            <rect
              x={'1018'}
              y={step * i + 17}
              width={i % 4 === 0 ? '288' : '200'}
              height={`12`}
            />
            <rect x={'1018'} y={step * i + 39} width={'288'} height={`1`} />
          </>
        );
      })}
    </ContentLoader>
  );
};

export default HomeHeroLoader;
