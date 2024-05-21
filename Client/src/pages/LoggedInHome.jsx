import React, { useState, useEffect } from 'react';
import { SideBar } from '../components/SideBar.jsx';
import { Card } from '../components/Card.jsx';
import axios from 'axios';

export function LoggedInHome({ setIsLoggedIn }) {
  // Create an array to hold the JSX elements
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const cardHandler = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/summ/summarizer/saved', {
          withCredentials: true
        });
        const titles = response.data.data.map((doc) => doc.title);
        setCards(titles);
      } catch (error) {
        console.error('Error fetching saved documents:', error);
      }
    };
    cardHandler();
  
  }, []); 
  return (
    <div className='flex'>
      <div className=' w-auto lg:w-64 '>
        <SideBar setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className='mt-4 w-full lg:w-3/4'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 ml-8 mr-5"
        >
          {cards.map((tile, index) => (
            <div className='ml-5' key={index}>
              <Card title={tile} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
