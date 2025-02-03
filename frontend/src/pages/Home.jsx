import React from "react";
import { useState } from "react";
import homeDesktop from "../assets/homeDesktop.png";
import homeMobile from "../assets/homeMobile.png"; // Add a mobile-specific image
import CardComponent from "../components/CardComponent";
import { eventData as initialEventData } from "../webService/eventData";
import useMobile from "../hooks/useMobile"; // Import the hook

const Home = () => {
  const [eventData, setEventData] = useState(initialEventData);
  const [isMobile] = useMobile(768); // Use the custom hook

  return (
    <section className="left-0 right-0 top-0 bottom-0 w-full h-full bg-gray-100 text-gray-900">
      <div className="w-full h-[400px]">
        <img src={isMobile ? homeMobile : homeDesktop} alt="Home Banner" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center items-center pt-6 text-neutral-800 mb-3">
        <h1 className="text-4xl font-extrabold relative">
          Public
          <span className="text-blue-500 relative px-3">
            Quiz
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
          </span>
          Events
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {eventData.map((event, index) => (
          <CardComponent
            key={index}
            title={event.title}
            redirectTo={event.redirectTo}
            imageURL={event.imageURL}
            eventCont={event.eventCont}
            bgColor={event.bgColor}
            data={event.data}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
