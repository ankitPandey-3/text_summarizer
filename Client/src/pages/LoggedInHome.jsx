import React from 'react';
import { Settings, LogOut, Layers, Archive, Server, Cpu, Brain } from 'lucide-react';
import { SideBar } from '../components/SideBar.jsx';
import { Card } from '../components/Card.jsx';

export function LoggedInHome({ setIsLoggedIn }) {
  // Create an array to hold the JSX elements
  const cards = [];

  // Use a loop to push the JSX elements into the array
  for (let index = 0; index < 20; index++) {
    cards.push(
      <div className='ml-5' key={index}>
        <Card />
      </div>
    );
  }

  return (
    <div className='flex'>
      <div className=' w-auto lg:w-64 '>
        <SideBar setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className='mt-4 w-full lg:w-3/4 '>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 ml-8 mr-5"
        >
          {/* Render the array of JSX elements */}
          {cards}
        </div>
      </div>
    </div>
  );
}
