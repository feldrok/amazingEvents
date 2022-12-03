let currentDate = "2022-01-01"

let events = [
  {
    _id: 1,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas7.jpg",
    name: "Collectivities Party",
    date: "2021-12-12",
    description:
      "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
    category: "Food Fair",
    place: "Room A",
    capacity: 45000,
    assistance: 42756,
    price: 5,
  },
  {
    _id: 2,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas2.jpg",
    name: "Korean style",
    date: "2022-08-12",
    description:
      "Enjoy the best Korean dishes, with international chefs and awesome events.",
    category: "Food Fair",
    place: "Room A",
    capacity: 45000,
    assistance: 42756,
    price: 10,
  },
  {
    _id: 3,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo5.jpg",
    name: "Jurassic Park",
    date: "2021-11-02",
    description:
      "Let's go meet the biggest dinosaurs in the paleontology museum.",
    category: "Museum",
    place: "Field",
    capacity: 82000,
    assistance: 65892,
    price: 15,
  },
  {
    _id: 4,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo1.jpg",
    name: "Parisian Museum",
    date: "2022-11-02",
    description:
      "A unique tour in the city of lights, get to know one of the most iconic places.",
    category: "Museum",
    place: "Paris",
    capacity: 8200,
    estimate: 8200,
    price: 3500,
  },
  {
    _id: 5,
    image:
      "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces2.jpg",
    name: "Comicon",
    date: "2021-02-12",
    description:
      "For comic lovers, all your favourite characters gathered in one place.",
    category: "Costume Party",
    place: "Room C",
    capacity: 120000,
    assistance: 110000,
    price: 54,
  },
  {
    _id: 6,
    image:
      "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces1.jpg",
    name: "Halloween Night",
    date: "2022-02-12",
    description: "Come with your scariest costume and win incredible prizes.",
    category: "Costume Party",
    place: "Room C",
    capacity: 12000,
    estimate: 9000,
    price: 12,
  },
  {
    _id: 7,
    image:
      "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica1.jpg",
    name: "Metallica in concert",
    date: "2022-01-22",
    description: "The only concert of the most emblematic band in the world.",
    category: "Music Concert",
    place: "Room A",
    capacity: 138000,
    estimate: 138000,
    price: 150,
  },
  {
    _id: 8,
    image:
      "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica2.jpg",
    name: "Electronic Fest",
    date: "2021-01-22",
    description:
      "The best national and international DJs gathered in one place.",
    category: "Music Concert",
    place: "Room A",
    capacity: 138000,
    assistance: 110300,
    price: 250,
  },
  {
    _id: 9,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton3.jpg",
    name: "10K for life",
    date: "2021-03-01",
    description: "Come and exercise, improve your health and lifestyle.",
    category: "Race",
    place: "Soccer field",
    capacity: 30000,
    assistance: 25698,
    price: 3,
  },
  {
    _id: 10,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton1.jpg",
    name: "15K NY",
    date: "2022-03-01",
    description:
      "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
    category: "Race",
    place: "New York",
    capacity: 3000000,
    assistance: 2569800,
    price: 3,
  },
  {
    _id: 11,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Libros7.jpg",
    name: "School's book fair",
    date: "2022-10-15",
    description: "Bring your unused school book and take the one you need.",
    category: "Book Exchange",
    place: "Room D1",
    capacity: 150000,
    estimate: 123286,
    price: 1,
  },
  {
    _id: 12,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Libros3.jpg",
    name: "Just for your kitchen",
    date: "2021-11-09",
    description:
      "If you're a gastronomy lover come get the cookbook that best suits your taste and your family's.",
    category: "Book Exchange",
    place: "Room D6",
    capacity: 130000,
    assistance: 90000,
    price: 100,
  },
  {
    _id: 13,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Cine3.jpg",
    name: "Batman",
    date: "2021-3-11",
    description: "Come see Batman fight crime in Gotham City.",
    category: "Cinema",
    place: "Room D1",
    capacity: 11000,
    assistance: 9300,
    price: 225,
  },
  {
    _id: 14,
    image: "https://amazingeventsapi.herokuapp.com/api/img/Cine7.jpg",
    name: "Avengers",
    date: "2022-10-15",
    description:
      "Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
    category: "Cinema",
    place: "Room D1",
    capacity: 9000,
    estimate: 9000,
    price: 250,
  },
]

let cardsContainer = document.querySelector(".cardsContainer")
for (let i = 0; i < events.length; i++) {
  if (events[i].date > currentDate) {
    cardsContainer.innerHTML += `

    <div class="xl:w-1/4 md:w-1/2 p-4">
          <div class="bg-white shadow-md border-2 flex flex-col justify-around p-6 rounded-lg customHeight hover:scale-105 hover:shadow-none duration-300">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="${events[i].image}"
              alt="content"
            />
            <h3
              class="tracking-widest text-primary-500 text-xs font-medium title-font"
            >
            ${events[i].category}
            </h3>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
            ${events[i].name}
            </h2>
            <p class="leading-relaxed text-base">
            ${events[i].description}
            </p>
            <div class="flex justify-between items-center pt-2">
              <h3 class="font-bold text-tertiary">$${events[i].price} USD</h3>
              <a class="p-2 pl-4 pr-4 rounded-full text-white bg-primary-500 shadow-md hover:shadow-lg duration-150 hover:bg-primary-400" href="./eventDetails.html">More details...</a>
            </div>
          </div>
        </div>
    `
  }
}
