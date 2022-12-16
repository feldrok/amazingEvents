import data from "./events.js"

let currentDate = data.currentDate

const cardsContainerAll = document.querySelector(".cardsContainerAll")
const cardsContainerUpcoming = document.querySelector(".cardsContainerUpcoming")
const cardsContainerPast = document.querySelector(".cardsContainerPast")
const containerButton = document.querySelector(".containerCategoryButtons")

let filteredEvents = data.events
let filteredEventsUpcoming = data.events.filter((event) => event.date > currentDate)
let filteredEventsPast = data.events.filter((event) => event.date < currentDate)

function renderEvent(container, eventsFiltered) {
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
        <a class="p-2 pl-4 pr-4 rounded-full text-white bg-primary-500 dark:shadow-black shadow-md hover:shadow-none duration-150 hover:bg-primary-400" href="./eventDetails.html?id=${event._id}">More details...</a>
        </div>
      </div>
    </div>
    `
  })
  displayEvent = displayEvent.join("")
  if (displayEvent === "") {
    container.innerHTML = `
    <h2 class="text-4xl font-bold text-primary-500 w-full text-center">
      No events found that match filter parameters, please try again.
    </h2>
    `
  } else {
    container.innerHTML = displayEvent
  }
}

function renderCards() {
  if (cardsContainerAll) {
    renderEvent(cardsContainerAll, filteredEvents)
  } else if (cardsContainerUpcoming) {
    renderEvent(cardsContainerUpcoming, filteredEventsUpcoming)
  } else if (cardsContainerPast) {
    renderEvent(cardsContainerPast, filteredEventsPast)
  }
}

function renderCategories() {
  const categories = [...new Set(data.events.map((event) => event.category))]
  const categoryBtns = categories
    .map((category) => {
      return `
    <li class="cursor-pointer justify-center items-center h-full w-auto">
      <label class="flex border rounded-full p-4 shadow-md filterButton h-full justify-center items-center m-3 hover:scale-105 hover:shadow-none hover:text-primary-500 dark:hover:text-primary-500 duration-300 text-sm text-gray-600 dark:text-white font-medium cursor-pointer dark:border-gray-500" id="categoryLabel" for="${category}"><input type="checkbox" name="category" class="checkbox hidden" value="${category}" id="${category}">${category}</label>
    </li>
    `
    })
    .join("")
  containerButton.innerHTML = categoryBtns
}

function search(filterText, eventArray) {
  return eventArray.filter(event => event.name.toLowerCase().includes(filterText.toLowerCase()))
}

function searchCheckbox(checkedBoxes, eventArray) {
  return eventArray.filter(event => checkedBoxes.includes(event.category) || checkedBoxes.length === 0)
}

function filterEvents() {
  const filterText = document.getElementById("search").value.toLowerCase()
  const checkedBoxes = Array.from(document.querySelectorAll("input[name=category]:checked")).map(el => el.value)
  const checkboxes = document.querySelectorAll("input[name=category]")
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", () => {
      if (checkboxes[i].checked) {
        checkboxes[i].parentElement.classList.add("text-white")
        checkboxes[i].parentElement.classList.remove("text-gray-600")
        checkboxes[i].parentElement.classList.add("bg-primary-500")
        checkboxes[i].parentElement.classList.add("scale-105")
        checkboxes[i].parentElement.classList.remove("hover:text-primary-500")
        checkboxes[i].parentElement.classList.remove("dark:hover:text-primary-500")
        checkboxes[i].parentElement.classList.remove("shadow-md")
      } else {
        checkboxes[i].parentElement.classList.remove("text-primary-500")
        checkboxes[i].parentElement.classList.add("text-gray-600")
        checkboxes[i].parentElement.classList.remove("bg-primary-500")
        checkboxes[i].parentElement.classList.remove("scale-105")
        checkboxes[i].parentElement.classList.add("hover:text-primary-500")
        checkboxes[i].parentElement.classList.add("dark:hover:text-primary-500")
        checkboxes[i].parentElement.classList.add("shadow-md")
      }
    })
  }
  let textFiltered
  if (cardsContainerAll) {
    textFiltered = search(filterText, data.events)
    textFiltered = searchCheckbox(checkedBoxes, textFiltered)
    renderEvent(cardsContainerAll, textFiltered)
  } else if (cardsContainerUpcoming) {
    textFiltered = search(filterText, filteredEventsUpcoming)
    textFiltered = searchCheckbox(checkedBoxes, textFiltered)
    renderEvent(cardsContainerUpcoming, textFiltered)
  } else if (cardsContainerPast) {
    textFiltered = search(filterText, filteredEventsPast)
    textFiltered = searchCheckbox(checkedBoxes, textFiltered)
    renderEvent(cardsContainerPast, textFiltered)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderCards()
  renderCategories()
  addEventListener("input", filterEvents)
})
