import React, { useState } from 'react';
import './userHome.css';
import img1 from "../../images/khamand.webp"
import img2 from "../../images/idli.jpg"
import img3 from "../../images/Dosa.webp"
import img4 from "../../images/meduwada.jpeg"
import img5 from "../../images/choleBhature.jpeg"
import img6 from "../../images/dhokla.webp"
import img7 from "../../images/burger.jpeg"

import { useNavigate } from 'react-router-dom';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([
    { id: 1, title: 'Khammand',image: img1, content: 'Gujrati Food Stall',location: [30.7309052,76.6947408] },
    { id: 2, title: 'Idli',image: img2, content: 'Tasty Idli Stall',location: [21.1594402,72.6571395] },
    { id: 3, title: 'Dosa',image: img3, content: 'Dosa Cravings Food Stall',location: [34.1068923,74.6416003] },
    { id: 4, title: 'Meduwada',image: img4, content: 'South Indian Food Stall',location: [29.195319,76.8826396] },
    { id: 5, title: 'Chole Bhature',image: img5, content: 'Amritsari Food Stall',location: [28.99105,77.03635] },
    { id: 6, title: 'Dhokla',image: img6, content: 'Dhokla Food stall',location: [30.7309052,76.6947408] },
    { id: 13, title: 'Burger',image: img7, content: 'Md Burger',location: [30.7309052,76.6947408] },
    { id: 7, title: 'Khammand',image: img1, content: 'Jignesh Food Stall',location: [30.7309052,76.6947408] },
    { id: 8, title: 'Idli',image: img2, content: 'South Indian Food Stall',location: [30.7309052,76.6947408] },
    { id: 9, title: 'Dosa',image: img3, content: 'Yummy Dosa Food Stall',location: [30.7309052,76.6947408] },
    { id: 10, title: 'Meduwada',image: img4, content: 'Tasty Food Stall',location: [30.7309052,76.6947408]},
    { id: 11, title: 'Chole Bhature',image: img5, content: 'Punjabi Dhaba',location: [30.7309052,76.6947408] },
    { id: 12, title: 'Dhokla',image: img6, content: 'Gujrati Farshan',location: [30.7309052,76.6947408] },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Navigator = useNavigate();

  function getLocation(location){
    Navigator(`/getRoute?lat=${location[0]}&lng=${location[1]}`);
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
          <div key={card.id} className="card1 bg-orange-400">
            <img src={card.image} width={200} height={200} />
            <h2 className="text-white font-bold">{card.title}</h2>
            <p className="text-white font-medium">{card.content}</p>
            <button className='search-button bg-orange-500' onClick={() => getLocation(card.location)}>Get Location</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
