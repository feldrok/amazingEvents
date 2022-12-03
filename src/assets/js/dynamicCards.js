import events from "./events.js"

let currentDate = "2022-01-01"

let cardsContainerAll = document.querySelector(".cardsContainerAll")
let cardsContainerUpcoming = document.querySelector(".cardsContainerUpcoming")
let cardsContainerPast = document.querySelector(".cardsContainerPast")

function cardsAll() {
  for (let i = 0; i < events.length; i++) {
    cardsContainerAll.innerHTML += `
  
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

function cardsUpcoming() {
  for (let i = 0; i < events.length; i++) {
    if (events[i].date > currentDate) {
      cardsContainerUpcoming.innerHTML += `
  
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
}

function cardsPast() {
  for (let i = 0; i < events.length; i++) {
    if (events[i].date < currentDate) {
      cardsContainerPast.innerHTML += `

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
}

if (cardsContainerAll) {
  cardsAll()
} else if (cardsContainerUpcoming) {
  cardsUpcoming()
} else if (cardsContainerPast) {
  cardsPast()
}
