import React, { useState , useEffect } from 'react';
import './userHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const img = {
  khamand:  require("../../images/khamand.webp"),
  idli:  require("../../images/idli.jpg"),
  Dosa:  require("../../images/Dosa.webp"),
  meduwada:  require("../../images/meduwada.jpeg"),
  choleBhature:  require("../../images/choleBhature.jpeg"),
  dhokla:  require("../../images/dhokla.webp"),
  burger:  require("../../images/burger.jpeg")
}

const getImageObject = (imageName) => {
  return img[imageName];
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([
    { id: 1, title: 'Khammand',image: "img1", content: 'Gujrati Food Stall',location: [30.7309052,76.6947408] },
    { id: 2, title: 'Idli',image: "img2", content: 'Tasty Idli Stall',location: [21.1594402,72.6571395] },
    { id: 3, title: 'Dosa',image: "img3", content: 'Dosa Cravings Food Stall',location: [34.1068923,74.6416003] },
    { id: 4, title: 'Meduwada',image: "img4", content: 'South Indian Food Stall',location: [29.195319,76.8826396] },
    { id: 5, title: 'Chole Bhature',image: "img5", content: 'Amritsari Food Stall',location: [28.99105,77.03635] },
    { id: 6, title: 'Dhokla',image: "img6", content: 'Dhokla Food stall',location: [30.7309052,76.6947408] },
    { id: 13, title: 'Burger',image: "img7", content: 'Md Burger',location: [30.7309052,76.6947408] },
    { id: 7, title: 'Khammand',image: "img1", content: 'Jignesh Food Stall',location: [30.7309052,76.6947408] },
    { id: 8, title: 'Idli',image: "img2", content: 'South Indian Food Stall',location: [30.7309052,76.6947408] },
    { id: 9, title: 'Dosa',image: "img3", content: 'Yummy Dosa Food Stall',location: [30.7309052,76.6947408] },
    { id: 10, title: 'Meduwada',image: "img4", content: 'Tasty Food Stall',location: [30.7309052,76.6947408]},
    { id: 11, title: 'Chole Bhature',image: "img5", content: 'Punjabi Dhaba',location: [30.7309052,76.6947408] },
    { id: 12, title: 'Dhokla',image: "img6", content: 'Gujrati Farshan',location: [30.7309052,76.6947408] },
  ]);

  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const initialfetchApi = async () =>{
    try{
        const res = await axios({
          url: 'http://localhost:8000/items',
          method: 'get',
          headers:{
            "content-type":"application/json"
          },
        })

        console.log(res);
        setCards(res.data);
    }catch(err){
      console.log(err)
    }
  } 

  useEffect(()=>{
    initialfetchApi();
    //initial scren load
  },[])   

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Navigator = useNavigate();

  function getLocation(lat,lng){
    Navigator(`/getRoute?lat=${lat}&lng=${lng}`);
  }

  return (
    <div className="container1 bg-orange-300">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button bg-orange-500">Search</button>
      </div>

      <div className="cards-container1 bg-orange-300">
        {filteredCards.map((card) => (
          <div key={card._id} className="card1 bg-orange-400">
            <img src={getImageObject(card.image)} width={200} height={200} />
            <h2 className="text-white font-bold">{card.title}</h2>
            
            <p className="text-white font-medium"><strong>about : </strong>{card.content}</p>
            <p className="text-white font-medium"><strong>open : </strong>{card.openingTime}</p>
            <p className="text-white font-medium"><strong>close : </strong>{card.closingTime}</p>

            <button className='search-button bg-orange-500' onClick={() => getLocation(card.latCoordinate,card.lngCoordinate)}>Get Location</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
