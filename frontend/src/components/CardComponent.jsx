import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ title, redirectTo, imageURL, eventCont, bgColor, data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to InsideCard and pass quiz data as state
    navigate(redirectTo, { state: { data: data } });
  };

  return (
    <div className='w-full h-96'>
      <div
        className={`w-72 h-full grid gap-3 rounded-lg overflow-hidden cursor-default transform transition-transform hover:shadow-lg hover:scale-105`}
        style={{ backgroundColor: bgColor }}
      >
        <div className='p-3'>
          <img className="w-full h-60 object-cover rounded-lg" src={imageURL} alt={title} />
          <div className="px-6 py-4 flex flex-col justify-center items-center">
            <div className="font-bold text-xl text-white">{title}</div>
            <div className="font-bold text-xl text-neutral-900">{eventCont} Events</div>
            {/* Button to start the quiz */}
            <button
              className="mt-4 p-2 text-neutral-600 bg-white rounded-md shadow-md hover:bg-blue-500 hover:text-white transition-colors "
              onClick={handleClick}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
