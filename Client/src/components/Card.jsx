import React from 'react'

export function Card() {
  return (
    <div className="w-400px rounded-md border">
      <img
        src='\image.png'
        alt="Laptop"
        className="h-200px w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">About Macbook</h1>
        
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-l font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
        >
          Open
        </button>
      </div>
    </div>
  )
}
