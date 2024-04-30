
import React, { useState , useEffect } from 'react';
import '../hawkerHome/hawkerHome.css';
import I3 from "../../images/admin.png";
import I1 from "../../images/addimg.png";
import I2 from "../../images/Logo.png";
import khamand from "../../images/Khamand.jpeg";
import idli from "../../images/idli.jpg";
import Dosa from "../../images/Dosa.webp";
import meduwada from "../../images/meduwada.jpeg"
import choleBhature from "../../images/choleBhature.jpeg"
import dhokla from "../../images/dhokla.webp"
import burger from  "../../images/burger.jpeg"
import pizza from "../../images/pizza.jpg"

import axios from 'axios';
import generateUniqueId from 'generate-unique-id';
// Define imageOptions outside of the components
const imageOptions = [
  { value: "khamand", url: khamand },
  { value: "idli", url: idli },
  { value: "Dosa", url: Dosa},
  { value: "meduwada" , url: meduwada},
  { value: "choleBhature" , url: choleBhature},
  { value: "dhokla" , url: dhokla},
  { value: "burger" , url: burger},
  { value: "pizza" , url: pizza},
];

const img = {
  khamand:  require("../../images/khamand.webp"),
  idli:  require("../../images/idli.jpg"),
  Dosa:  require("../../images/Dosa.webp"),
  meduwada:  require("../../images/meduwada.jpeg"),
  choleBhature:  require("../../images/choleBhature.jpeg"),
  dhokla:  require("../../images/dhokla.webp"),
  burger:  require("../../images/burger.jpeg")
}


function RegistrationForm({ show, onClose, onSubmit, name, price, image, description, setName, setPrice, setImage, setDescription }) {
  if (!show) return null;

  return (
    <div className="modal">
      <form className="form-home" onSubmit={onSubmit}>
        <label>Name of the Dish:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Price of the Dish:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Select Image:</label>
        <select value={image} onChange={(e) => setImage(e.target.value)} required>
          {imageOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.value}</option>
          ))}
        </select>
        <label>Description of the Dish:</label>
        {/* Apply CSS class for limiting the height of the textarea */}
        <textarea className="description-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Submit</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
}




function App() {
  const [dishes, setDishes] = useState([]);
  const [Sno , setSno] = useState(1000);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the dish being edited
  const [editID, setEditID] = useState(null);
  const [userName , setUserName] = useState(null);
  const [detail , setDetails] = useState(null);
  
  const initialfetchApi = async () =>{
    try{
        const res = await axios({
          url: 'http://localhost:8000/hawker/detail',
          method: 'post',
          headers:{
            "content-type":"application/json"
          },
          data:{
            email: localStorage.getItem('email')
          }
        })
        localStorage.setItem('openingTime',res.data.openingTime);
        localStorage.setItem('closingTime',res.data.closingTime);
        localStorage.setItem('latCoordinate',res.data.latCoordinate);
        localStorage.setItem('lngCoordinate',res.data.lngCoordinate);
        localStorage.setItem('_id',res.data._id);          
    }catch(err){
      console.log(err)
    }   
  } 

  const getItemsAPI = async ()=>{
    try{
      const resItems = await axios({
        url: 'http://localhost:8000/items/byhawker',
        method: 'post',
        headers:{
          "content-type":"application/json"
        },
        data:{
          createdBy: localStorage.getItem('_id')
        }
      })    
      console.log(resItems.data);
      setDishes(resItems.data); 
      console.log(dishes); 
  }catch(err){
    console.log(err)
  }
  }


  useEffect(() => {
    
    initialfetchApi();
    getItemsAPI();
    // ;()()

  }, []);

  useEffect(() => {
    
    getItemsAPI();
    // ;()()

  }, [dishes]);

//1
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // If editIndex is not null, update the existing dish
      const updatedDishes = [...dishes];

      updatedDishes[editIndex] = {editID , name, price, image, description };

      const updateItemAPIRequest = async () =>{
        try{
            const res = await axios({
              url: 'http://localhost:8000/items/update',
              method: 'post',
              headers:{
                "content-type":"application/json"
              },
              data:{
                dishId: editID,
                title: updatedDishes[editIndex].name,
                price: updatedDishes[editIndex].price,
                image: updatedDishes[editIndex].image,
                content: updatedDishes[editIndex].description,
                openingTime: localStorage.getItem('openingTime'),
                closingTime: localStorage.getItem('closingTime'),
                latCoordinate: localStorage.getItem('latCoordinate'),
                lngCoordinate: localStorage.getItem('lngCoordinate'),
                createdBy: localStorage.getItem('_id')
              }
            })
        }catch(err){
          console.log(err)
        }
      } 
      updateItemAPIRequest();
      // setDishes(updatedDishes);
      setEditIndex(null);
    } 
    else {
      // If editIndex is null, add a new dish
      const dishId = generateUniqueId({
        length: 10,
        useLetters: false,
        excludeSymbols: true
    });
      const newDish = {dishId, name, price, image, description };
      // setSno(Sno+1);
      const createItemAPIRequest = async () =>{
        try{
            const res = await axios({
              url: 'http://localhost:8000/items/create',
              method: 'post',
              headers:{
                "content-type":"application/json"
              },
              data:{
                dishId: newDish.dishId,
                title: newDish.name,
                price: newDish.price,
                image: newDish.image,
                content: newDish.description,
                openingTime: localStorage.getItem('openingTime'),
                closingTime: localStorage.getItem('closingTime'),
                latCoordinate: localStorage.getItem('latCoordinate'),
                lngCoordinate: localStorage.getItem('lngCoordinate'),
                createdBy: localStorage.getItem('_id')
              }
            })
        }catch(err){
          console.log(err)
        }
      } 
      createItemAPIRequest();
      // setDishes([...dishes, newDish]);
    }
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    setShowForm(false); // Hide the form after submission
  };

  const handleEdit = (index,ID) => {
    const dishToEdit = dishes[index];
    setName(dishToEdit.title);
    setPrice(dishToEdit.price);
    setImage(dishToEdit.image);
    setDescription(dishToEdit.content);
    setEditIndex(index); // Set editIndex to the index of the dish being edited
    setEditID(ID);
    setShowForm(true); 
  };

  const handleDelete = (index,ID) => {
    const updatedDishes = [...dishes];
    updatedDishes.splice(index, 1); // Remove the dish at the specified index
    const itemDeleteAPI = async () =>{
      try{
          const res = await axios({
            url: 'http://localhost:8000/items/delete',
            method: 'post',
            headers:{
              "content-type":"application/json"
            },
            data:{
              dishId: ID,
              createdBy: localStorage.getItem('_id')
            }
          })
      }catch(err){
        console.log(err)
      }
    } 
    itemDeleteAPI();
    // setDishes('');
  };

  // Function to get the image URL from the imageOptions array
  function getImageUrl(imageValue) {
    const imageOption = imageOptions.find(option => option.value === imageValue);
    return imageOption ? imageOption.url : '';
  }

  return (
    <div className="containerHawkerHome bg-orange-300">
      {/* Navbar */}
      <nav className="bg-orange-400 navbar-home">
        <div className="navbar-left-home">
          <img src={I2} alt="Hawker Icon" className="icon" />
          <span>Hawkers</span>
        </div>
        <div className="navbar-right-home">
          <div className="profile-icon-home">
            <img src={I3} alt="Profile Icon" className="icon" />
            {localStorage.getItem('email')}
            <div className="dropdown-content-home">
              <a href="#">Profile</a>
              <a href="#">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content-home">
        <div className="card-home" onClick={() => setShowForm(true)}>
          <img src={I1} alt="Add Dish Icon" className="circle-icon-home"/>
        </div>
        {/* Registration form */}
        <RegistrationForm
          show={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          name={name}
          price={price}
          image={image}
          description={description}
          setName={setName}
          setPrice={setPrice}
          setImage={setImage}
          setDescription={setDescription}
        />
        {/* Display dishes */}
        {dishes.map((dish,index) => (
          <div key={dish.dishId} className="bg-orange-400 card-name">
            <img src={getImageUrl(dish.image)} alt={dish.title} />
            <div className='text-black font-medium'><strong>Name:</strong> {dish.title}</div>
            <div className='text-black font-medium'><strong>Price:</strong> {dish.price}</div>
            <div className="text-black font-medium description"><strong>Description:</strong> {dish.content}</div>
            <button onClick={() => handleEdit(index,dish.dishId)} className="edit-button">Edit</button>
            <button onClick={() => handleDelete(index,dish.dishId)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;