import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

const mapContainter = (props) => {
  const { google, data } = props;

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Map
      google={google}
      zoom={Number(data.zoom) - 3}
      style={mapStyles}
      initialCenter={{ lat: `${data.latitude}`, lng: `${data.longitude}` }}
    >
      <Marker
        position={{ lat: `${data.latitude}`, lng: `${data.longitude}` }}
      />
    </Map>
  );
};

mapContainter.propTypes = {
  google: PropTypes.any,
  data: PropTypes.any,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM',
})(mapContainter);
