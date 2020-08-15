import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setState, setPosition } from '../../Redux/Diet/action';
const Location = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        dispatch(setPosition(position));
        console.log(position);
        const myLat = position.coords.latitude;
        const myLon = position.coords.longitude;
        const myApiKey = 'xKY10BBNp7cUAsRjzs70x205CQUqW0bu';
        fetch(
          `https://www.mapquestapi.com/geocoding/v1/reverse?key=${myApiKey}&location=${myLat}%2C${myLon}&thumbMaps=false&includeNearestIntersection=true`
        )
          .then((response, err) => {
            if (err) console.log(err);
            else return response.json();
          })
          .then((responseJson) => {
            // console.log(responseJson);
            dispatch(setState(responseJson.results[0].locations[0].adminArea3));
            // dispatch(
            //   addLocation(responseJson.results[0].locations[0].adminArea5)
            // );
            // props.stateHandler(responseJson.results[0].locations[0].adminArea3);
          });
      });
    }
  });
  return null;
};

export default Location;
