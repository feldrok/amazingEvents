import data from "./events.js"

let currentDate = data.currentDate

const cardsContainerAll = document.querySelector(".cardsContainerAll")
const cardsContainerUpcoming = document.querySelector(".cardsContainerUpcoming")
const cardsContainerPast = document.querySelector(".cardsContainerPast")
const containerButton = document.querySelector(".containerCategoryButtons")

let filteredEvents = data.events
let filteredEventsUpcoming = data.events.filter((event) => event.date > currentDate)
let filteredEventsPast = data.events.filter((event) => event.date < currentDate)

function appendEvent(container, eventsFiltered) {
  let displayEvent = eventsFiltered.map((event) => {
    return `
    <div class="xl:w-1/4 md:w-1/2 p-4 w-full h-full active" id="card">
      <div class="bg-white min-h-[450px] dark:bg-tertiary dark:border-gray-200 dark:shadow-black shadow-md border flex flex-col justify-around p-6 rounded-lg hover:scale-105 hover:shadow-none duration-300">
        <img
          class="h-40 rounded w-full object-cover object-center mb-6"
          src="${event.image}"
          alt="content"
        />
        <h3
          class="tracking-widest text-primary-500 text-xs font-medium title-font"
          id="cardCategory"
        >
        ${event.category}
        </h3>
        <h2 class="text-lg text-gray-900 dark:text-white font-medium title-font mb-4" id="name">
        ${event.name}
        </h2>
        <p class="leading-relaxed dark:text-white text-base">
        ${event.description}
        </p>
        <div class="flex justify-between items-center pt-2">
        <h3 class="font-bold text-tertiary dark:text-gray-200">$${event.price} USD</h3>
        <a class="p-2 pl-4 pr-4 rounded-full text-white bg-primary-500 dark:shadow-black shadow-md hover:shadow-none duration-150 hover:bg-primary-400" href="./eventDetails.html">More details...</a>
        </div>
      </div>
    </div>
    `
  })
  displayEvent = displayEvent.join("")
  container.innerHTML = displayEvent
}

function displayCards() {
  if (cardsContainerAll) {
    appendEvent(cardsContainerAll, filteredEvents)
  } else if (cardsContainerUpcoming) {
    appendEvent(cardsContainerUpcoming, filteredEventsUpcoming)
  } else if (cardsContainerPast) {
    appendEvent(cardsContainerPast, filteredEventsPast)
  }
}

const displayCategoryButtons = () => {
  const categories = data.events.reduce((values, item) => {
    if (!values.includes(item.category)) {
      values.push(item.category)
    }
    return values
  }, [])
  const categoryBtns = categories
    .map((category) => {
      return `
    <li class="flex-1 cursor-pointer justify-center items-center w-full">
      <label class="flex p-4 drop-shadow filterButton h-full justify-center items-center m-3 hover:text-primary-500 dark:hover:text-primary-500 duration-150 text-sm text-gray-600 dark:text-white font-medium cursor-pointer" id="categoryLabel" for="${category}"><input type="checkbox" name="category" class="checkbox" value="${category}" id="${category}">${category}</label>
    </li>
    `
    })
    .join("")
  containerButton.innerHTML = categoryBtns
}

function busqueda(filterText, eventArray) {
  return eventArray.filter(event => event.name.toLowerCase().includes(filterText.toLowerCase()))
}

function busquedaCheck(checkedBoxes, eventArray) {
  return eventArray.filter(event => checkedBoxes.includes(event.category) || checkedBoxes.length === 0)
}

function filterEvents() {
  const filterText = document.getElementById("search").value.toLowerCase()
  const checkedBoxes = Array.from(document.querySelectorAll("input[name=category]:checked")).map(el => el.value)
  let filtradoTexto
  if (cardsContainerAll) {
    filtradoTexto = busqueda(filterText, data.events)
    filtradoTexto = busquedaCheck(checkedBoxes, filtradoTexto)
    appendEvent(cardsContainerAll, filtradoTexto)
  } else if (cardsContainerUpcoming) {
    filtradoTexto = busqueda(filterText, data.events)
    filtradoTexto = busquedaCheck(checkedBoxes, filtradoTexto)
    appendEvent(cardsContainerUpcoming, filtradoTexto)
  } else if (cardsContainerPast) {
    filtradoTexto = busqueda(filterText, data.events)
    filtradoTexto = busquedaCheck(checkedBoxes, filtradoTexto)
    appendEvent(cardsContainerPast, filtradoTexto)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  displayCards()
  displayCategoryButtons()
  addEventListener("input", filterEvents)
})
