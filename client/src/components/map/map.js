import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import { useSelector } from 'react-redux';
import { DeviceContext } from 'twilio/lib/rest/preview/deployed_devices/fleet/device';
import axios from 'axios';
import { connect } from 'react-redux';

// const Map = () => {
//   const position = useSelector((state) => state.diet.position);
//   console.log(position);
//   return (
//     <div>
//       <GoogleMap
//         defaultZoom={13}
//         defaultCenter={{
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         }}
//       >
//         <Marker
//           position={{
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           }}
//         />
//       </GoogleMap>
//     </div>
//   );
// };

// const MapWrapped = withScriptjs(withGoogleMap(Map));

// const Hospitals = () => {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <MapWrapped
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// };

// const Hospitals = () => {
//   const mapRef = React.createRef();
//   const hospitalRef = useRef();
//   const ref = React.createRef();
//   const position = useSelector((state) => state.diet.position);
//   const [map, setMap] = useState();

//   const getHospitals = async (H) => {
//     const res = await axios.get(
//       `https://discover.search.hereapi.com/v1/discover?at=${position.coords.latitude},${position.coords.longitude}&limit=15&q=hospital&in=countryCode:IND&apiKey=1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4`
//     );
//     console.log(res.data.items);
//     hospitalRef.current = res.data.items;
//     console.log(H);
//     const platform = new H.service.Platform({
//       apikey: '1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4',
//     });

//     const defaultLayers = platform.createDefaultLayers();
//     console.log(position);
//     // Create an instance of the map
//     const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
//       // This map is centered over Europe
//       center: { lat: position.coords.latitude, lng: position.coords.longitude },
//       zoom: 13,
//       pixelRatio: window.devicePixelRatio || 1,
//     });
//     var svgMarkup =
//       '<svg width="40" height="24" ' +
//       'xmlns="http://www.w3.org/2000/svg">' +
//       '<rect stroke="white" fill="#1b468d" x="1" y="1" width="40" ' +
//       'height="22" /><text x="12" y="18" font-size="12pt" ' +
//       'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//       'fill="white">You</text></svg>';

//     // Create an icon, an object holding the latitude and longitude, and a marker:
//     var html = document.createElement('div'),
//       divIcon = document.createElement('div'),
//       divText = document.createElement('div'),
//       imgIco = document.createElement('img');
//     imgIco.setAttribute(
//       'src',
//       'https://images.vexels.com/media/users/3/144205/isolated/preview/039f3a81b340e8ad1b6a1f2f228385d1-hospital-stroke-icon-by-vexels.png'
//     );
//     imgIco.style.width = '20px';
//     imgIco.style.height = '20px';
//     divText.style.fontSize = '10px';
//     divIcon.appendChild(imgIco);
//     divText.innerHTML = 'hello';
//     html.appendChild(divIcon);
//     html.appendChild(divText);
//     // html.style.width = '20px';

//     var domIcon = new H.map.DomIcon(html);

//     var icon = new H.map.Icon(svgMarkup),
//       marker = new H.map.DomMarker(
//         { lat: position.coords.latitude, lng: position.coords.longitude },
//         { icon: domIcon }
//       );
//     map.addObject(marker);
//     ref.current = map;
//     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//     const ui = H.ui.UI.createDefault(map, defaultLayers);
//     if (hospitalRef.current) {
//       hospitalRef.current.forEach((el) => {
//         console.log('el');
//         var html = document.createElement('div'),
//           divIcon = document.createElement('div'),
//           divText = document.createElement('div'),
//           imgIco = document.createElement('img');
//         imgIco.setAttribute(
//           'src',
//           'https://images.vexels.com/media/users/3/144205/isolated/preview/039f3a81b340e8ad1b6a1f2f228385d1-hospital-stroke-icon-by-vexels.png'
//         );
//         imgIco.style.width = '20px';
//         imgIco.style.height = '20px';
//         divText.style.fontSize = '10px';
//         divIcon.appendChild(imgIco);
//         divText.innerHTML = el.title;
//         html.appendChild(divIcon);
//         html.appendChild(divText);
//         var domIcon = new H.map.DomIcon(html);
//         const marker = new H.map.DomMarker(
//           { lat: el.position.lat, lng: el.position.lng },
//           { icon: domIcon }
//         );
//         map.addObject(marker);
//       });
//     }
//     setMap(map);
//   };

//   useEffect(() => {
//     const H = window.H;
//     getHospitals(H);

//     return () => {
//       //   map.dispose();
//     };
//   }, []);
//   return <div ref={mapRef} style={{ height: '100vh' }} />;
// };

// console.log(H);
// const platform = new H.service.Platform({
//   apikey: '1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4',
// });

// const defaultLayers = platform.createDefaultLayers();
// console.log(position);
// // Create an instance of the map
// const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
//   // This map is centered over Europe
//   center: { lat: position.coords.latitude, lng: position.coords.longitude },
//   zoom: 13,
//   pixelRatio: window.devicePixelRatio || 1,
// });
// var svgMarkup =
//   '<svg width="40" height="24" ' +
//   'xmlns="http://www.w3.org/2000/svg">' +
//   '<rect stroke="white" fill="#1b468d" x="1" y="1" width="40" ' +
//   'height="22" /><text x="12" y="18" font-size="12pt" ' +
//   'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//   'fill="white">You</text></svg>';

// // Create an icon, an object holding the latitude and longitude, and a marker:
// var html = document.createElement('div'),
//   divIcon = document.createElement('div'),
//   divText = document.createElement('div'),
//   imgIco = document.createElement('img');
// imgIco.setAttribute(
//   'src',
//   'https://images.vexels.com/media/users/3/144205/isolated/preview/039f3a81b340e8ad1b6a1f2f228385d1-hospital-stroke-icon-by-vexels.png'
// );
// imgIco.style.width = '20px';
// imgIco.style.height = '20px';
// divText.style.fontSize = '10px';
// divIcon.appendChild(imgIco);
// divText.innerHTML = 'hello';
// html.appendChild(divIcon);
// html.appendChild(divText);
// // html.style.width = '20px';

// var domIcon = new H.map.DomIcon(html);

// var icon = new H.map.Icon(svgMarkup),
//   marker = new H.map.DomMarker(
//     { lat: position.coords.latitude, lng: position.coords.longitude },
//     { icon: domIcon }
//   );
// map.addObject(marker);
// ref.current = map;
// const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
// const ui = H.ui.UI.createDefault(map, defaultLayers);
// if (hospitalRef.current) {
//   hospitalRef.current.forEach((el) => {
//     console.log('el');
//     var html = document.createElement('div'),
//       divIcon = document.createElement('div'),
//       divText = document.createElement('div'),
//       imgIco = document.createElement('img');
//     imgIco.setAttribute(
//       'src',
//       'https://images.vexels.com/media/users/3/144205/isolated/preview/039f3a81b340e8ad1b6a1f2f228385d1-hospital-stroke-icon-by-vexels.png'
//     );
//     imgIco.style.width = '20px';
//     imgIco.style.height = '20px';
//     divText.style.fontSize = '10px';
//     divIcon.appendChild(imgIco);
//     divText.innerHTML = el.title;
//     html.appendChild(divIcon);
//     html.appendChild(divText);
//     var domIcon = new H.map.DomIcon(html);
//     const marker = new H.map.DomMarker(
//       { lat: el.position.lat, lng: el.position.lng },
//       { icon: domIcon }
//     );
//     ref.current.addObject(marker);
//   });
// }

class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null,
  };

  async componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: '1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4',
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: {
          lat: this.props.position.coords.latitude,
          lng: this.props.position.coords.longitude,
        },
        zoom: 13,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    var svgMarkup =
      '<svg width="40" height="24" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<rect stroke="white" fill="#1b468d" x="1" y="1" width="40" ' +
      'height="22" /><text x="12" y="18" font-size="12pt" ' +
      'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
      'fill="white">You</text></svg>';
    var icon = new H.map.Icon(svgMarkup),
      marker = new H.map.Marker(
        {
          lat: this.props.position.coords.latitude,
          lng: this.props.position.coords.longitude,
        },
        { icon: icon }
      );
    map.addObject(marker);
    const res = await axios.get(
      `https://discover.search.hereapi.com/v1/discover?at=${this.props.position.coords.latitude},${this.props.position.coords.longitude}&limit=15&q=hospital&in=countryCode:IND&apiKey=1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4`
    );
    console.log(res.data.items);
    res.data.items.forEach((el) => {
      console.log('el');
      var html = document.createElement('div'),
        divIcon = document.createElement('div'),
        divText = document.createElement('div'),
        imgIco = document.createElement('img');
      imgIco.setAttribute(
        'src',
        'https://images.vexels.com/media/users/3/144205/isolated/preview/039f3a81b340e8ad1b6a1f2f228385d1-hospital-stroke-icon-by-vexels.png'
      );
      imgIco.style.width = '20px';
      imgIco.style.height = '20px';
      divText.style.fontSize = '10px';
      divIcon.appendChild(imgIco);
      divText.innerHTML = el.title;
      html.appendChild(divIcon);
      html.appendChild(divText);
      var domIcon = new H.map.DomIcon(html);
      const marker = new H.map.DomMarker(
        { lat: el.position.lat, lng: el.position.lng },
        { icon: domIcon }
      );
      map.addObject(marker);
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    if (this.state.map) {
      this.state.map.dispose();
    }
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: '500px' }} />
    );
  }
}

let mapStateToProps = function mapStateToProps(state) {
  return {
    position: state.diet.position,
  };
};

export default connect(mapStateToProps)(DisplayMapClass);
