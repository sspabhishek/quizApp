import image from "../assets/sport_card.jpg"
import quizData from '../webService/insideEventData';

export  const eventData = [
    {
      title: "Event A",
      redirectTo: "/insideCard",
      imageURL: image,
      eventCont: quizData.length,
      bgColor: "#6bd5ff",
      data: quizData
    },
    {
      title: "Event B",
      redirectTo: "/login",
      imageURL: image,
      eventCont: 2,
      bgColor: "#f16602"
    },
    {
      title: "Event A",
      redirectTo: "/register",
      imageURL: image,
      eventCont: 1,
      bgColor: "#edc224"
    },
    {
      title: "Event B",
      redirectTo: "/login",
      imageURL: image,
      eventCont: 2,
      bgColor: "#72ff6b"
    },
    {
      title: "Event A",
      redirectTo: "/register",
      imageURL: image,
      eventCont: 1,
      bgColor: "#2b3cdd"
    },
    {
      title: "Event B",
      redirectTo: "/login",
      imageURL: image,
      eventCont: 2,
      bgColor: "#f5425a"
    },
    {
      title: "Event A",
      redirectTo: "/register",
      imageURL: image,
      eventCont: 1,
      bgColor: "#fc2bbe"
    },
    {
      title: "Event B",
      redirectTo: "/login",
      imageURL: image,
      eventCont: 2,
      bgColor: "#2bfcbd"
    },
  ];
  