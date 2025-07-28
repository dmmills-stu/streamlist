'use client';

import React, { useState } from 'react';
import '../styles/MainPage.css'

const StreamList: React.FC = () => {
  const [streamItem, setStreamItem] = useState('');
  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamItem(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (streamItem.trim() !== '') {
      console.log('User Input:', streamItem);
      setSubmittedItems([...submittedItems, streamItem]);
      setStreamItem('');
    } else {
      console.log('Error: Empty input submitted.');
    }
  };

  const handleClear = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedItems([]);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">StreamList Application</h1>
      <div className="max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            value={streamItem}
            onChange={handleInputChange}
            placeholder="Enter a movie or show..."
            className="border border-gray-400 p-2 rounded-md"
          />
          <div className="flex gap-2 items-center justify-center">
            <button
              type="submit"
              className="bg-red-700 text-white px-10 py-2 mx-4 rounded-md hover:bg-red-800 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-700 text-white py-2 px-10 mx-4 rounded-md hover:bg-red-800 transition"
            >
              Clear List
            </button>
          </div>
        </form>

        {submittedItems && (
          <ul className="mt-4 list-disc pl-5">
          {submittedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default StreamList;