let data
let currentDate
fetch("https://amazing-events.onrender.com/api/events")
  .then((res) => res.json())
  .then((events) => {
    data = events
    currentDate = data.currentDate
    eventStatistic()
    eventStatsUpcoming()
    eventStatsPast()
  })
  .catch((err) => console.log(err))

let eventStatistics = document.getElementById("eventStatistics")

function eventStatistic() {
  let assistance = data.events.filter((event) => event.assistance)
  let highestAttendance = assistance.reduce((a, b) =>
    a.assistance / a.capacity * 100 > b.assistance / b.capacity * 100 ? a : b
  )
  let lowestAttendance = assistance.reduce((a, b) =>
  a.assistance / a.capacity * 100 < b.assistance / b.capacity * 100 ? a : b
  )
  let capacity = Object.values(data.events).filter((event) => event.capacity)
  let largestCapacity = capacity.reduce((a, b) =>
    a.capacity > b.capacity ? a : b
  )

  eventStatistics.innerHTML = `
    <tr
    class="bg-white hover:bg-gray-200 border border-grey-500 md:border-none block md:table-row"
    >
      <td
        class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Highest % Attendance</span
        ><span class="font-medium">${highestAttendance.name}</span>, ${((highestAttendance.assistance / highestAttendance.capacity) * 100).toFixed(2) }%
      </td>
      <td
        class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Lowest % Attendance</span
        ><span class="font-medium">${lowestAttendance.name}</span>, ${((lowestAttendance.assistance / lowestAttendance.capacity) * 100).toFixed(2)}%
      </td>
      <td
        class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
      >
        <span class="inline-block w-1/3 md:hidden font-bold"
          >Largest Capacity</span
        ><span class="font-medium">${largestCapacity.name}</span>, ${largestCapacity.capacity.toLocaleString()} people
      </td>
    </tr>
  `
}

function getEventStats(filteredEvents, type) {
  let categories = filteredEvents.map((event) => event.category)
  let revenue = filteredEvents.map((event) => event.price * event[type])
  let percentage = filteredEvents.map((event) =>
    ((event[type] * 100) / event.capacity).toFixed(2)
  )
  let objectEvents = []
  for (let i = 0; i < categories.length; i++) {
    objectEvents[i] = {
      category: categories[i],
      revenue: revenue[i],
      percentage: percentage[i],
    }
  }
  return objectEvents
}

let upcomingEvents = document.getElementById("eventStatsUpcoming")

function eventStatsUpcoming() {
  let filteredUpcoming = data.events.filter((event) => event.date > currentDate)
  let objectEvents = getEventStats(filteredUpcoming, "estimate")
  let categoryRow = objectEvents
    .map((element) => {
      return `
      <tr
      class="bg-white hover:bg-gray-200 border border-grey-500 md:border-none block md:table-row"
      >
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell font-medium"
        >
          <span class="inline-block w-1/3 md:hidden font-bold">Categories</span>
            ${element.category}
        </td>
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Estimated Revenue</span
          >${element.revenue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </td>
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Percentage of attendance</span
          >${element.percentage}%
        </td>
      </tr>
    `
    })
    .join("")
  upcomingEvents.innerHTML = categoryRow
}

let pastEvents = document.getElementById("eventStatsPast")

function eventStatsPast() {
  let filteredPast = data.events.filter((event) => event.date < currentDate)
  let objectEvents = getEventStats(filteredPast, "assistance")

  let categoryRow = objectEvents
    .map((element) => {
      return `
      <tr
      class="bg-white hover:bg-gray-200 border border-grey-500 md:border-none block md:table-row"
      >
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell font-medium"
        >
        <span class="inline-block w-1/3 md:hidden font-bold">Categories</span>
          ${element.category}
        </td>
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Revenues</span
          >${element.revenue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          })}
        </td>
        <td
          class="p-2 md:w-1/3 md:border md:border-grey-500 text-left block md:table-cell"
        >
          <span class="inline-block w-1/3 md:hidden font-bold"
            >Percentage of attendance</span
          >${element.percentage}%
        </td>
      </tr>
    `
    })
    .join("")
  pastEvents.innerHTML = categoryRow
}
