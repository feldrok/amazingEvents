import data from "./events.js"

let headerContainer = document.getElementById("headerContainer")
let eventContainer = document.getElementById("eventContainer")

function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search)
  return parameters.get(parameterName)
}

function renderEvent(eventId) {
  let event = data.events.find((event) => event._id == eventId)
  headerContainer.innerHTML = `
  <div class="flex flex-col justify-center h-full text-center p-6 bg-tertiary bg-opacity-80">
    <h1 class="text-6xl font-bold text-secondary drop-shadow-md cursor-pointer duration-300">
      ${event.name}
    </h1>
    <h2 class="text-2xl font-bold text-primary-500 drop-shadow-md cursor-pointer duration-300">
      ${event.category}
    </h2>
  </div>
  `
  headerContainer.style.backgroundImage = `url(${event.image})`
  let eventDate = new Date(event.date)
  let eventMonth = eventDate.toLocaleString("default", { month: "short" })
  let eventDay = eventDate.toLocaleString("default", { day: "numeric" })

  eventContainer.innerHTML = `
    <div class="flex flex-col lg:flex-row p-4 items-center border-b">
    <div
      class="flex items-center justify-center p-4 lg:flex-col-reverse"
    >
      <h3
        class="font-medium text-lg pr-2 text-primary-500 border-b-2 lg:border-0 text-center"
      >
        ${eventDay}
      </h3>
      <h2
        class="font-bold text-xl text-primary-500 border-b-2 lg:border-0 capitalize"
      >
        ${eventMonth}
      </h2>
    </div>
    <div class="flex flex-col items-center bg-white dark:bg-tertiary w-full p-1">
      <h2 class="text-primary-500 font-bold text-lg p-1">
        ${event.name}
      </h2>
      <div class="flex flex-row p-1 justify-center items-center">
        <img
          class="w-5 h-5 mr-2"
          src="./assets/icons/calendar.png"
          alt=""
        />
        <h3 class="text-gray-600 dark:text-slate-200 font-medium tracking-widest text-sm">
          ${eventDate.toLocaleString("es-cl", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </h3>
      </div>
      <div class="flex flex-row p-1">
        <img
          class="w-5 h-5 mr-2"
          src="./assets/icons/location.png"
          alt=""
        />
        <h3 class="text-gray-600 dark:text-slate-200 font-medium tracking-widest">
          ${event.place}
        </h3>
      </div>
    </div>
  </div>

  <div class="h-full w-full">
    <div
      class="h-[15%] w-full flex justify-center items-center mb-1 p-3 border-b"
    >
      <h2
        class="font-bold tracking-tighter text-tertiary dark:text-slate-200 text-2xl drop-shadow-md"
      >
        Buy your tickets
      </h2>
    </div>
    <div >
      <form action="">
        <table class="min-w-full border-collapse table shadow-md">
          <thead class="table-header-group">
            <tr class="bg-white dark:bg-tertiary border-b">
              <th class="p-2 text-black dark:text-slate-200 font-bold text-left table-cell">
                Type
              </th>
              <th class="p-2 text-black dark:text-slate-200 font-bold text-left table-cell">
                Price
              </th>
              <th class="p-2 text-black dark:text-slate-200 font-bold text-left table-cell">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody class="table-row-group">
            <tr
              class="bg-white dark:bg-tertiary border-b table-row hover:bg-gray-100 dark:hover:bg-black duration-300"
            >
              <td class="p-2 text-left md:table-cell dark:text-slate-200">Basic Ticket</td>
              <td class="p-2 text-left table-cell dark:text-slate-200">$${event.price} USD</td>
              <td class="p-2 text-left table-cell">
                <div
                  class="flex flex-row w-full h-10 rounded-md border shadow-md"
                >
                  <select
                    class="w-full p-2"
                    id="ticketQuantity"
                  >
                    <option value="0" selected>0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white dark:bg-tertiary flex flex-col items-center">
          <div class="p-4">
            <p class="font-thin text-sm italic dark:text-slate-200">
              Price includes service charge
            </p>
          </div>
          <button
            class="bg-primary-500 hover:bg-primary-400 text-white border dark:border-gray-400 p-4 mb-6 rounded-2xl shadow-md hover:scale-105 duration-150 hover:shadow-none"
            id="buyButton"
            href="#"
            >
            <span class="pr-6 font-medium">Add to cart</span>
            <span class="pl-6 border-l font-bold">$</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  `
}


renderEvent(getParameter("id"))
