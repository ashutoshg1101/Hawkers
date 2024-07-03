import React, { useState, useEffect } from "react";
import "./userHome.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const img = {
  khamand: require("../../images/khamand.webp"),
  idli: require("../../images/idli.jpg"),
  Dosa: require("../../images/Dosa.webp"),
  meduwada: require("../../images/meduwada.jpeg"),
  choleBhature: require("../../images/choleBhature.jpeg"),
  dhokla: require("../../images/dhokla.webp"),
  burger: require("../../images/burger.jpeg"),
  pizza: require("../../images/pizza.jpg")
};

const getImageObject = (imageName) => {
  return img[imageName];
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [cards, setCards] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const initialfetchApi = async () => {
    try {
      const res = await axios({
        url: "http://localhost:8000/items",
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });

      console.log(res);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initialfetchApi();
    //initial scren load
  }, []);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Navigator = useNavigate();

  function getLocation(lat, lng) {
    Navigator(`/getRoute?lat=${lat}&lng=${lng}`);
  }

  const handleCardClick = (createdBy) => {
    setShowModal(true);
    (async () => {
      try {
        const res = await axios({
          url: "http://localhost:8000/hawker/detailbyID",
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          data: {
            createdBy: createdBy,
          },
        });

        setModalData(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  };
  return (
    <div className="container1 bg-orange-300">
      {showModal ? (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center">
          <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-70"></div>
          <div className="w-[450px] h-[350px] z-50">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{modalData.shopName}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <h1 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Contact : {modalData.mobile}
                </h1>
                <h1 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  email : {modalData.email}
                </h1>
                <h1 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Address : {modalData.address}
                </h1>
                <h1 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Opening Time :{" "}
                  {parseInt(modalData.openingTime) > 12
                    ? `${parseInt(modalData.openingTime) - 12} PM`
                    : `${modalData.openingTime} AM`}
                </h1>{" "}
                <h1 className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Closing Time :{" "}
                  {parseInt(modalData.closingTime) > 12
                    ? `${parseInt(modalData.closingTime) - 12} PM`
                    : `${modalData.closingTime} AM`}
                </h1>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => getLocation(modalData.latCoordinate, modalData.lngCoordinate)}
                >
                  Get Location
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
          <div
            onClick={() => {
              handleCardClick(card.createdBy);
            }}
          >
            <div key={card._id} className="card1 bg-orange-400">
              <img src={getImageObject(card.image)} width={200} height={200} />
              <h2 className="text-white font-bold">{card.title}</h2>
              <h2 className="text-white font-bold">Price : {card.price}</h2>
              <p className="text-white font-medium">
                <strong>Description : </strong>
                {card.content}
              </p>
              

              <button
                className="search-button bg-orange-500"
                onClick={() =>
                  getLocation(card.latCoordinate, card.lngCoordinate)
                }
              >
                Get Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
