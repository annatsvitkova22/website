import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapContainter = (props) => {
  const { google, data } = props;
  console.log(data);
  const mapStyles = {
    width: '100%',
    height: '100%',
  };
  return (
    <Mapgit
      google={google}
      zoom={Number(data.zoom) - 3}
      style={mapStyles}
      initialCenter={{ lat: `${data.latitude}`, lng: `${data.longitude}` }}
    >
      <Marker
        position={{ lat: `${data.latitude}`, lng: `${data.longitude}` }}
      />
    </Mapgit>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBz7hBEUeLfjjkbutilOakeLZv5hCDf-GM',
})(mapContainter);
