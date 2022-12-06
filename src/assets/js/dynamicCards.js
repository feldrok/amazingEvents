import events from "./events.js"

let currentDate = "2022-01-01"

const cardsContainerAll = document.querySelector(".cardsContainerAll")
const cardsContainerUpcoming = document.querySelector(".cardsContainerUpcoming")
const cardsContainerPast = document.querySelector(".cardsContainerPast")

const containerButton = document.querySelector(".containerCategoryButtons")

function displayCards(eventItems) {
  if (cardsContainerAll) {
    let displayEvents = eventItems.map(function (event) {
      return `
      <div class="xl:w-1/4 md:w-1/2 p-4 w-full h-full">
        <div class="bg-white min-h-[450px] dark:bg-tertiary dark:border-gray-200 dark:shadow-black shadow-md border flex flex-col justify-around p-6 rounded-lg hover:scale-105 hover:shadow-none duration-300">
          <img
            class="h-40 rounded w-full object-cover object-center mb-6"
            src="${event.image}"
            alt="content"
          />
          <h3
            class="tracking-widest text-primary-500 text-xs font-medium title-font"
          >
          ${event.category}
          </h3>
          <h2 class="text-lg text-gray-900 dark:text-white font-medium title-font mb-4">
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
    displayEvents = displayEvents.join("")
    cardsContainerAll.innerHTML = displayEvents
  } else if (cardsContainerUpcoming) {
    let displayEvents = eventItems.map(function (event) {
      if (event.date > currentDate) {
        return `
        <div class="xl:w-1/4 md:w-1/2 p-4 w-full h-full">
          <div class="bg-white min-h-[450px] dark:bg-tertiary dark:border-gray-200 dark:shadow-black shadow-md border flex flex-col justify-around p-6 rounded-lg hover:scale-105 hover:shadow-none duration-300">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="${event.image}"
              alt="content"
            />
            <h3
              class="tracking-widest text-primary-500 text-xs font-medium title-font"
            >
            ${event.category}
            </h3>
            <h2 class="text-lg text-gray-900 dark:text-white font-medium title-font mb-4">
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
      }
    })
    displayEvents = displayEvents.join("")
    cardsContainerUpcoming.innerHTML = displayEvents
  } else if (cardsContainerPast) {
    let displayEvents = eventItems.map(function (event) {
      if (event.date < currentDate) {
        return `
        <div class="xl:w-1/4 md:w-1/2 p-4 w-full h-full">
          <div class="bg-white min-h-[450px] dark:bg-tertiary dark:border-gray-200 dark:shadow-black shadow-md border flex flex-col justify-around p-6 rounded-lg hover:scale-105 hover:shadow-none duration-300">
            <img
              class="h-40 rounded w-full object-cover object-center mb-6"
              src="${event.image}"
              alt="content"
            />
            <h3
              class="tracking-widest text-primary-500 text-xs font-medium title-font"
            >
            ${event.category}
            </h3>
            <h2 class="text-lg text-gray-900 dark:text-white font-medium title-font mb-4">
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
      }
    })
    displayEvents = displayEvents.join("")
    cardsContainerPast.innerHTML = displayEvents
  }
}

function displayCategoryButtons() {
  const categories = events.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category)
      }
      return values
    },
    ["All"]
  )
  const categoryBtns = categories
    .map(function (category) {
      return `
    <li class="flex-1 cursor-pointer justify-center items-center">
    <a id="#${category}" class="flex p-4 drop-shadow filterButton h-full justify-center items-center m-3 hover:text-primary-500 dark:hover:text-primary-500 duration-150 text-sm text-gray-600 dark:text-white font-medium" data-id="${category}">
      ${category}
    </a>
  </li>
    `
    })
    .join("")
  containerButton.innerHTML = categoryBtns
  const filterButtons = document.querySelectorAll(".filterButton")
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id
      const eventsCategory = events.filter(function (eventItem) {
        if (eventItem.category === category) {
          return eventItem
        }
      })
      if (category === "All") {
        displayCards(events)
      } else {
        displayCards(eventsCategory)
      }
    })
  })
  function handleActiveButton() {
    const filterButtons = document.querySelectorAll(".filterButton")
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach((btn) => {
          btn.classList.remove("text-gray-600")
          btn.classList.remove("text-primary-500")
          btn.classList.remove("dark:text-primary-500")
          btn.classList.remove("border-b-2")
          btn.classList.remove("border-primary-500")
        })
        e.currentTarget.classList.add("text-primary-500")
        e.currentTarget.classList.add("border-b-2")
        e.currentTarget.classList.add("border-primary-500")
        e.currentTarget.classList.add("dark:text-primary-500")
      })
    })
  }
  handleActiveButton()
}

window.addEventListener("DOMContentLoaded", function () {
  displayCards(events)
  displayCategoryButtons()
})
