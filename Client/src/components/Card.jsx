import React from 'react'
import { useNavigate } from 'react-router-dom';

export function Card({title}) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/summarizer/${title}`);
    }
  return (
    <div className="w-400px rounded-md border">
      <img
        src='\image.png'
        alt="Clipboard"
        className="h-200px w-full rounded-md object-cover"
      />
      <div className="p-2">
        <h1 className="text-m font-semibold">{title}</h1>
        
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-l font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
          onClick={handleClick}
        >
          Read
        </button>
      </div>
    </div>
  )
}
