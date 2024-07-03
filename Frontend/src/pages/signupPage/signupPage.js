
import React, { useState , useEffect} from 'react';
import "../signupPage/signupPage.css";
import { useNavigate } from 'react-router-dom';
// import MapWithMarker from '../../components/mapCoordinate';
import axios from 'axios';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIconUser = new L.Icon({
  iconUrl: require("../../images/Location 2.png"), // Location dal na he
  iconSize: [35,45],
  iconAnchor: [17, 46],
  popupAnchor: [0,-46],
});

// const MapWithMarker = () => {
  

//   return (
    
//   );
// };


const SignUp = () => {

  const Navigator = useNavigate();

  // State variables to hold form data
  // const [username, setUsername] = useState('');
  const [shopName, setShopName] = useState('');
  const [mobile, setMobile] = useState(localStorage.getItem('mobile'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg , setErrorMsg] = useState('');

  // comment

  const [position, setPosition] = useState(null);
  const [latCoordinate , setlat] = useState(51.505);
  const [lngCoordinate , setlng] = useState(-0.09);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
        setlat(position.coords.latitude);
        setlng(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, []); // Empty dependency array to run once on mount

  const handleToLoginPage = () => {
    
    Navigator("/loginPage")
  }

  // comment
  // Function to handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault();

    let isValid = true;

    // Reset any previous error messages
    // setErrorMsg('');

    // Check if shop name is empty
    if (!shopName.trim()) {
        setErrorMsg('Shop Name cannot be empty');
        isValid = false;
    }

    // Check if mobile number is empty or invalid
    // if (!mobile.trim() || !/^\d{10}$/.test(mobile)) {
    //     setErrorMsg('Mobile number is invalid');
    //     isValid = false;
    // }

    // Check if email is empty or invalid
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        setErrorMsg('Email is invalid');
        isValid = false;
    }

    // Check if password is empty
    if (!password.trim()) {
        setErrorMsg('Password cannot be empty');
        isValid = false;
    }

    // Check if opening time is empty
    if (!openingTime.trim()) {
        setErrorMsg('Opening Time cannot be empty');
        isValid = false;
    }

    // Check if closing time is empty
    if (!closingTime.trim()) {
        setErrorMsg('Closing Time cannot be empty');
        isValid = false;
    }

    // Check if address is empty
    if (!address.trim()) {
        setErrorMsg('Address cannot be empty');
        isValid = false;
    }

    const initialfetchApi = async () =>{
      try{
          const res = await axios({
            url: 'http://localhost:8000/hawker/signup',
            method: 'post',
            headers:{
              "content-type":"application/json"
            },
            data: {
              shopName,
              mobile,
              email,
              password,
              openingTime,
              closingTime,
              address,
              latCoordinate,
              lngCoordinate
            }
          })
      }catch(err){
        console.log(err)
      }
    }
    
    if(isValid)
    {
      initialfetchApi();
      // You can add form validation logic here
      // and send the form data to the backend
      console.log('Form submitted');
    }
    else
    {
      console.log(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="signup-page-signup bg-orange-200">
      <div className="left-container-signup bg-orange-300">
        <div className="signup-heading-signup">Registeration Form</div>
        <div className="form-container-signup">
          <form className="form-signup" onSubmit={handleSubmit}>
            <label htmlFor="username">Shop Name:</label>
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              
            />

            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              value={localStorage.getItem('mobile')}
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <label htmlFor="shopName">Shop Name:</label>
            <input type="text" id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} /> */}

            <label htmlFor="openingTime">Opening Time:</label>
            <input
              type="time"
              id="openingTime"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
            />

            <label htmlFor="closingTime">Closing Time:</label>
            <input
              type="time"
              id="closingTime"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
            />

            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="latCoordinate">lat:</label>
            <input
              type="text"
              id="latCoordinate"
              value={latCoordinate}
            />

            <label htmlFor="lngCoordinate">lng:</label>
            <input
              type="text"
              id="latCoordinate"
              value={lngCoordinate}
              
            />

            <button
              className="btnsignup bg-orange-500"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
            <button
              className="btnsignup bg-orange-500"
              type="submit"
              onClick={() => {
                handleToLoginPage();
              }}
            >
              Back
            </button>
          </form>
        </div>
      </div>
      <div className="right-container-signup">
        <div className="square-container-signup">
          {/* comment */}
          <div>
            {position && (
              <MapContainer
                center={position || [51.505, -0.09]} // Default center if user location not available
                zoom={8}
                scrollWheelZoom={true}
                style={{ height: "500px", width: "500px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position && (
                  <>
                    <Marker
                      icon={markerIconUser}
                      draggable={true}
                      position={position}
                      eventHandlers={{
                        dragend: (e) => {
                          setPosition(e.target.getLatLng());
                          setlat(e.target.getLatLng().lat);
                          setlng(e.target.getLatLng().lng);
                        },
                      }}
                    ></Marker>
                  </>
                )}
              </MapContainer>
            )}
            {position && (
              <div>
                Latitude: {latCoordinate}, Longitude: {lngCoordinate}
              </div>
            )}
          </div>
          {/* comment */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;


